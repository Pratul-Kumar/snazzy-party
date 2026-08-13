"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ref, onValue, update } from "firebase/database";
import { rtdb, trackEvent, updateArenaWin } from "@/lib/firebase";
import { CONFIG } from "@/lib/config";
import { Copy, Share2, RefreshCw } from "lucide-react";
import toast from "react-hot-toast";
import { useUser } from "@/app/context/UserContext";

interface Player {
  id: string;
  name: string;
  side: "🍕" | "🍗";
}

interface GameState {
  player1: Player;
  player2?: Player;
  board: (string | null)[];
  turn: string;
  status: "waiting" | "playing" | "won" | "draw";
  winner?: string;
  createdAt: number;
  matchId: string;
  rewarded?: boolean;
  rematchRequestedBy?: string | null;
  lastAction?: {
    playerId: string;
    type: "reaction" | "message";
    content: string;
    timestamp: number;
  };
}

const WINNING_COMBINATIONS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Cols
  [0, 4, 8], [2, 4, 6]             // Diagonals
];

export default function GameRoom() {
  const params = useParams();
  const router = useRouter();
  const gameId = params.gameId as string;
  
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [myId, setMyId] = useState<string | null>(null);
  const [joinName, setJoinName] = useState("");
  const [loading, setLoading] = useState(true);
  const [localStatsUpdated, setLocalStatsUpdated] = useState(false);
  const { updateStat, hasIdentity, awardXP, profile } = useUser();

  // Pre-fill join name from profile if logged in
  useEffect(() => {
    if (hasIdentity && profile?.name) {
      setJoinName(profile.name);
    }
  }, [hasIdentity, profile]);

  // Initialize my ID
  useEffect(() => {
    let storedId = localStorage.getItem(`snazzy_arena_id`);
    if (!storedId) {
      storedId = "p_" + Math.random().toString(36).substr(2, 9);
      localStorage.setItem(`snazzy_arena_id`, storedId);
    }
    setMyId(storedId);

    // Also check if we created THIS specific game and set our ID to 'p1' for it
    const creatorState = localStorage.getItem(`snazzy_arena_${gameId}`);
    if (creatorState) {
      const parsed = JSON.parse(creatorState);
      if (parsed.id === "p1") {
        setMyId("p1");
      }
    }
  }, [gameId]);

  // Process global reward — defined before the effect that uses it
  const processReward = useCallback(async (data: GameState) => {
    // Lock the reward
    await update(ref(rtdb, `games/${gameId}`), { rewarded: true });
    
    if (data.status === "won" && data.winner) {
      const winnerName = data.winner === data.player1.id ? data.player1.name : data.player2?.name;
      const loserName = data.winner === data.player1.id ? data.player2?.name : data.player1.name;
      
      await trackEvent("ARENA", `${winnerName} DESTROYED ${loserName} in Tic-Tac-Toe!`, `+10 Party Pressure`);
      if (winnerName) await updateArenaWin(winnerName);
    } else if (data.status === "draw") {
      await trackEvent("ARENA", `${data.player1.name} and ${data.player2?.name} drew.`, `Nobody won.`);
    }
  }, [gameId]);

  // Subscribe to RTDB
  useEffect(() => {
    const gameRef = ref(rtdb, `games/${gameId}`);
    const unsubscribe = onValue(gameRef, (snapshot) => {
      setLoading(false);
      const data = snapshot.val();
      if (data) {
        // Firebase RTDB strips nulls from arrays — normalize board
        const normalizedData = {
          ...data,
          board: Array.isArray(data.board) 
            ? data.board.map((cell: any) => cell || "") 
            : Array(9).fill("")
        };
        setGameState(normalizedData);
        
        // Handle global rewarding once (only P1 does this)
        if ((normalizedData.status === "won" || normalizedData.status === "draw") && !normalizedData.rewarded && myId) {
          if (myId === normalizedData.player1.id) {
            processReward(normalizedData);
          }
        }

        // Handle local XP and stats (Both players do this)
        if ((normalizedData.status === "won" || normalizedData.status === "draw") && !localStatsUpdated && myId) {
          if (hasIdentity) {
            updateStat("gamesPlayed", 1);
            awardXP("TICTACTOE_PLAY");

            if (normalizedData.status === "won") {
              if (normalizedData.winner === myId) {
                updateStat("wins", 1);
                updateStat("partyPressure", 10);
                awardXP("TICTACTOE_WIN");
                
                // Track streak logic locally for achievement
                if (profile) {
                  const newStreak = profile.stats.currentWinStreak + 1;
                  updateStat("currentWinStreak", 1);
                  if (newStreak >= 5) {
                    awardXP("TICTACTOE_STREAK_5", `streak_5_${gameId}`);
                  }
                }
              } else {
                updateStat("losses", 1);
                updateStat("partyPressure", 2);
                // Reset streak
                if (profile && profile.stats.currentWinStreak > 0) {
                  updateStat("currentWinStreak", -profile.stats.currentWinStreak);
                }
              }
            } else if (normalizedData.status === "draw") {
              updateStat("draws", 1);
              awardXP("TICTACTOE_DRAW");
              if (profile && profile.stats.currentWinStreak > 0) {
                  updateStat("currentWinStreak", -profile.stats.currentWinStreak);
              }
            }
          }
          setLocalStatsUpdated(true);
        }
      } else {
        setGameState(null); // Game expired or not found
      }
    });

    return () => unsubscribe();
  }, [gameId, myId, processReward, localStatsUpdated, hasIdentity, updateStat, awardXP, profile]);

  // Listener for Live Reactions/Messages
  const prevActionTimestamp = useRef<number>(0);
  useEffect(() => {
    if (gameState?.lastAction && gameState.lastAction.playerId !== myId) {
      if (gameState.lastAction.timestamp > prevActionTimestamp.current) {
        prevActionTimestamp.current = gameState.lastAction.timestamp;
        
        const senderName = gameState.lastAction.playerId === gameState.player1.id ? gameState.player1.name : gameState.player2?.name;
        
        if (gameState.lastAction.type === "reaction") {
          toast(`${senderName}: ${gameState.lastAction.content}`, { 
            icon: gameState.lastAction.content,
            position: "top-center",
            style: { background: '#111', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' }
          });
        } else {
          toast.custom((t) => (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-[#111] border border-white/20 p-4 rounded-2xl shadow-2xl max-w-sm flex flex-col gap-1"
            >
              <span className="text-[10px] font-black uppercase tracking-widest text-accent">{senderName} says:</span>
              <span className="text-sm font-bold text-white">{gameState.lastAction!.content}</span>
            </motion.div>
          ));
        }
      }
    }
  }, [gameState?.lastAction, myId]);

  const joinGame = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!joinName || !gameState || !myId) return;

    const side = gameState.player1.side === "🍕" ? "🍗" : "🍕";
    const newMatchId = Math.random().toString(36).substr(2, 9);
    
    await update(ref(rtdb, `games/${gameId}`), {
      player2: { id: myId, name: joinName, side },
      status: "playing",
      matchId: newMatchId,
      rewarded: false
    });
  };

  const makeMove = async (index: number) => {
    if (!gameState || gameState.status !== "playing" || gameState.turn !== myId) return;
    if (gameState.board[index] !== "") return;

    const newBoard = [...gameState.board];
    const mySide = myId === gameState.player1.id ? gameState.player1.side : gameState.player2?.side;
    newBoard[index] = mySide || "";

    // Check for win
    let winner = null;
    let status = "playing";
    
    for (const combo of WINNING_COMBINATIONS) {
      if (newBoard[combo[0]] && newBoard[combo[0]] === newBoard[combo[1]] && newBoard[combo[0]] === newBoard[combo[2]]) {
        winner = myId;
        status = "won";
        break;
      }
    }

    if (!winner && !newBoard.includes("")) {
      status = "draw";
    }

    const nextTurn = myId === gameState.player1.id ? gameState.player2?.id : gameState.player1.id;

    await update(ref(rtdb, `games/${gameId}`), {
      board: newBoard,
      turn: nextTurn,
      status,
      winner
    });
  };

  const requestRematch = async () => {
    await update(ref(rtdb, `games/${gameId}`), {
      rematchRequestedBy: myId
    });
  };

  const acceptRematch = async () => {
    const newMatchId = Math.random().toString(36).substr(2, 9);
    await update(ref(rtdb, `games/${gameId}`), {
      board: Array(9).fill(""),
      status: "playing",
      winner: null,
      matchId: newMatchId,
      rewarded: false,
      rematchRequestedBy: null,
      turn: gameState?.player1.id
    });
  };

  const declineRematch = async () => {
    await update(ref(rtdb, `games/${gameId}`), {
      rematchRequestedBy: null
    });
    toast.error("Rematch declined");
  };

  const sendAction = async (type: "reaction" | "message", content: string) => {
    if (!myId) return;
    await update(ref(rtdb, `games/${gameId}`), {
      lastAction: {
        playerId: myId,
        type,
        content,
        timestamp: Date.now()
      }
    });
    toast.success("Sent!", { position: "bottom-center", icon: "💨" });
  };

  const shareResult = async () => {
    const myName = myId === gameState?.player1.id ? gameState?.player1.name : gameState?.player2?.name;
    const gameUrl = `${CONFIG.DOMAIN}/play/${gameId}`;
    // Single message with URL included once — no separate url field to avoid WhatsApp doubling it
    const msg = `🎮 I JUST WON THE SNAZZY PARTY BATTLE\n\n${myName} destroyed the opposition.\nScore: 1-0\nParty Pressure: +10\n\nYour turn to challenge me 😂\n${gameUrl}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Snazzy Party Arena Winner",
          text: msg,
          // NO url field — WhatsApp & other apps append it to text causing duplicate
        });
      } catch (err) {
        navigator.clipboard.writeText(msg);
        toast.success("Copied to clipboard!");
      }
    } else {
      navigator.clipboard.writeText(msg);
      toast.success("Result copied!");
    }
  };

  const copyInvite = () => {
    const msg = `Bro 😂\n\nStop scrolling.\nCome beat me at Tic-Tac-Toe.\nLoser gets reminded about Snazzy's missing party.\n\nGame Code: ${gameId}\nJoin here 👇\n${CONFIG.DOMAIN}/play/${gameId}`;
    navigator.clipboard.writeText(msg);
    toast.success("Invite copied!");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!gameState) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#0a0a0a] text-center">
        <div className="text-5xl mb-4">🚫</div>
        <h2 className="text-2xl font-black text-white mb-2 uppercase tracking-widest">Game Not Found</h2>
        <p className="text-muted mb-2">No game with code <span className="text-accent font-black">{gameId}</span> found.</p>
        <p className="text-white/30 text-sm mb-8">The game may have expired, or the code might be wrong. Double-check with your friend!</p>
        <button onClick={() => router.push('/')} className="bg-white text-black px-8 py-3 rounded-xl font-bold uppercase">Back to Home</button>
      </div>
    );
  }

  const amIPlayer1 = myId === gameState.player1.id;
  const amIPlayer2 = gameState.player2 && myId === gameState.player2.id;
  const isMyTurn = gameState.turn === myId;
  const isSpectator = !amIPlayer1 && (!amIPlayer2 && gameState.player2);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center p-4 font-sans noise overflow-hidden relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="w-full max-w-[400px] lg:max-w-[800px] relative z-10 flex flex-col min-h-[90dvh]">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 pt-4">
          <button onClick={() => router.push('/')} className="text-xs font-bold uppercase tracking-widest text-muted hover:text-white">
            ← Home
          </button>
          <div className="bg-white/10 px-3 py-1 rounded-full border border-white/10 text-[10px] font-black uppercase tracking-widest text-accent">
            Live Arena
          </div>
        </div>

        {/* Players / Status */}
        <div className="bg-[#111] border border-white/10 p-4 rounded-3xl mb-8 flex justify-between items-center relative shadow-2xl">
          <div className="text-center flex-1">
            <span className="text-3xl block mb-1">{gameState.player1.side}</span>
            <span className="text-xs font-bold uppercase tracking-widest block truncate max-w-[100px] mx-auto">{gameState.player1.name}</span>
          </div>
          
          <div className="text-center px-4 font-black text-xl italic text-white/20">VS</div>
          
          <div className="text-center flex-1">
            <span className="text-3xl block mb-1">{gameState.player2 ? gameState.player2.side : "⏳"}</span>
            <span className="text-xs font-bold uppercase tracking-widest block truncate max-w-[100px] mx-auto">
              {gameState.player2 ? gameState.player2.name : "Waiting..."}
            </span>
          </div>
        </div>

        {/* Status Message */}
        <div className="text-center mb-8 h-8">
          {gameState.status === "waiting" && amIPlayer1 && (
             <p className="text-sm font-bold uppercase tracking-widest text-gold animate-pulse">Waiting for challenger...</p>
          )}
          {gameState.status === "playing" && (
            <p className="text-sm font-bold uppercase tracking-widest">
              {isMyTurn ? <span className="text-accent">Your move bro 👀</span> : <span className="text-muted">Opponent is cooking...</span>}
            </p>
          )}
        </div>

        <div className="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-start lg:mt-8 flex-1">
          {/* LEFT COL: The Board & Game Forms */}
          <div className="w-full flex-1 flex flex-col items-center justify-center min-h-[400px]">
            {/* The Board */}
            {gameState.status !== "waiting" || amIPlayer1 ? (
              <div className="grid grid-cols-3 gap-3 md:gap-4 mb-8 mx-auto w-full max-w-[min(90vw,400px)]">
                {gameState.board.map((cell, idx) => (
                  <motion.button
                    key={idx}
                    whileTap={isMyTurn && !cell && gameState.status === "playing" ? { scale: 0.9 } : {}}
                    onClick={() => makeMove(idx)}
                    disabled={!isMyTurn || cell !== "" || gameState.status !== "playing"}
                    className={`aspect-square min-h-[72px] md:min-h-[100px] rounded-2xl flex items-center justify-center text-5xl md:text-6xl bg-[#1a1a1a] border border-white/5 shadow-inner transition-colors
                      ${!cell && isMyTurn && gameState.status === "playing" ? 'hover:bg-white/10 cursor-pointer' : 'cursor-default'}
                      ${cell ? 'bg-white/5' : ''}
                    `}
                  >
                    <AnimatePresence>
                      {cell && (
                        <motion.span
                          initial={{ scale: 0, opacity: 0, rotate: -45 }}
                          animate={{ scale: 1, opacity: 1, rotate: 0 }}
                          className="drop-shadow-lg pointer-events-none select-none"
                        >
                          {cell}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>
                ))}
              </div>
            ) : (
              /* Join Game Form */
              <div className="bg-[#111] p-6 rounded-3xl border border-white/10 mb-8 mx-auto w-full max-w-[320px]">
                <h3 className="text-lg font-black uppercase mb-4 text-center">🎮 You&apos;ve been challenged</h3>
                <p className="text-xs font-bold text-muted text-center mb-6">{gameState.player1.name} thinks they can beat you.</p>
                
                <form onSubmit={joinGame}>
                  <input 
                    type="text" 
                    value={joinName}
                    onChange={(e) => setJoinName(e.target.value)}
                    placeholder="Your Name"
                    required
                    maxLength={15}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 font-bold text-sm text-center focus:outline-none focus:border-accent mb-4"
                  />
                  <button 
                    type="submit"
                    className="w-full bg-accent text-white py-3 rounded-xl font-black uppercase tracking-widest text-xs hover:scale-[1.02] active:scale-[0.98] transition-transform"
                  >
                    Accept Challenge
                  </button>
                </form>
              </div>
            )}
          </div>

          {/* RIGHT COL: Overlays & Banter */}
          <div className="flex flex-col gap-8 h-full">

        {/* End Game Overlay */}
        <AnimatePresence>
          {(gameState.status === "won" || gameState.status === "draw") && !isSpectator && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-auto bg-[#111] border border-white/10 rounded-3xl p-6 shadow-2xl text-center"
            >
              <h3 className="text-2xl font-black uppercase tracking-tight mb-2">
                {gameState.status === "draw" ? "🤝 DRAW" : gameState.winner === myId ? "🎉 YOU WON!" : "😂 YOU LOST"}
              </h3>
              
              <p className="text-xs font-bold uppercase tracking-widest text-muted mb-6">
                {gameState.status === "draw" ? "Just like the party planning." : gameState.winner === myId ? "BIG BRAIN DETECTED 🧠" : "Don't worry bro, you can still sign the petition."}
              </p>

              {gameState.status === "won" && gameState.winner === myId && (
                <div className="inline-block bg-accent/10 border border-accent/20 text-accent px-4 py-2 rounded-xl mb-6 font-black uppercase tracking-widest text-xs">
                  Party Pressure +10
                </div>
              )}

              {gameState.rematchRequestedBy === myId ? (
                <div className="bg-white/5 border border-white/10 py-4 rounded-xl mb-4 min-h-[56px] flex items-center justify-center">
                  <p className="text-xs font-bold uppercase tracking-widest text-gold animate-pulse">Waiting for opponent...</p>
                </div>
              ) : gameState.rematchRequestedBy && gameState.rematchRequestedBy !== myId ? (
                <div className="mb-4">
                  <p className="text-xs font-black uppercase tracking-widest text-accent mb-3">🔥 Opponent wants a rematch! 🔥</p>
                  <div className="flex flex-col gap-3">
                    <button 
                      onClick={acceptRematch}
                      className="w-full min-h-[56px] bg-accent text-white rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-accent/90 transition-colors"
                    >
                      Accept Rematch
                    </button>
                    <button 
                      onClick={declineRematch}
                      className="w-full min-h-[56px] bg-white/10 text-white rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-white/20 transition-colors"
                    >
                      Decline
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <button 
                    onClick={requestRematch}
                    className="w-full min-h-[56px] bg-white/10 hover:bg-white/20 rounded-xl font-bold uppercase tracking-widest text-xs transition-colors flex items-center justify-center gap-2"
                  >
                    <RefreshCw size={16} /> Request Rematch
                  </button>
                  <button 
                    onClick={shareResult}
                    className="w-full min-h-[56px] bg-white text-black rounded-xl font-bold uppercase tracking-widest text-xs transition-colors flex items-center justify-center gap-2"
                  >
                    <Share2 size={16} /> Share Result
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Waiting invite actions */}
        {gameState.status === "waiting" && amIPlayer1 && (
          <div className="mt-auto flex flex-col gap-3">
            <button onClick={copyInvite} className="w-full min-h-[56px] bg-white/10 text-white rounded-2xl font-bold uppercase tracking-widest text-xs transition-colors flex items-center justify-center gap-2 hover:bg-white/20">
              <Copy size={16} /> Copy Game Link
            </button>
            <button onClick={shareResult} className="w-full min-h-[56px] bg-accent text-white rounded-2xl font-bold uppercase tracking-widest text-xs transition-colors flex items-center justify-center gap-2 hover:bg-accent/90">
              <Share2 size={16} /> Share Invite
            </button>
          </div>
        )}

            {/* Live Banter Menu (only when playing and a participant) */}
            {gameState.status === "playing" && !isSpectator && (
              <div className="mt-auto pt-8 flex flex-col gap-3">
                <p className="text-[9px] font-black uppercase tracking-widest text-muted text-center mb-1">Live Banter</p>
                <div className="flex flex-wrap gap-2 justify-center mb-2">
                  {['🤡', '💀', '🔥', '😡', '👀'].map(emoji => (
                    <button 
                      key={emoji}
                      onClick={() => sendAction("reaction", emoji)}
                      className="min-w-[56px] min-h-[56px] bg-white/5 hover:bg-white/10 rounded-xl text-2xl flex items-center justify-center transition-transform active:scale-90"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <button onClick={() => sendAction("message", "Bro is taking hours to move 😂")} className="min-h-[56px] bg-white/5 hover:bg-white/10 rounded-xl text-[10px] font-bold uppercase tracking-widest text-white/70 px-2 flex items-center justify-center text-center">Taking hours 😂</button>
                  <button onClick={() => sendAction("message", "Wallet Loading... 💳")} className="min-h-[56px] bg-white/5 hover:bg-white/10 rounded-xl text-[10px] font-bold uppercase tracking-widest text-white/70 px-2 flex items-center justify-center text-center">Wallet Loading 💳</button>
                  <button onClick={() => sendAction("message", "You're getting cooked! 🍗")} className="min-h-[56px] bg-white/5 hover:bg-white/10 rounded-xl text-[10px] font-bold uppercase tracking-widest text-white/70 px-2 flex items-center justify-center text-center">Getting cooked 🍗</button>
                  <button onClick={() => sendAction("message", "EZ WIN 😎")} className="min-h-[56px] bg-white/5 hover:bg-white/10 rounded-xl text-[10px] font-bold uppercase tracking-widest text-white/70 px-2 flex items-center justify-center text-center">EZ WIN 😎</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
