#!/data/data/com.termux/files/usr/bin/bash
# Starter 2-in-1 Termux pakai tmux
# Backend kiri, Frontend kanan

BASE_DIR=$(pwd)
if [ ! -f "$BASE_DIR/backend/app/main.py" ]; then
  BASE_DIR="$HOME/storage/shared/MLChecker/ml-skin-checker"
fi

cd $BASE_DIR || exit 1

echo "🚀 Starting ML Skin Checker di Termux..."
echo "Base: $BASE_DIR"

# Cek tmux
if ! command -v tmux &> /dev/null; then
  pkg install -y tmux
fi

# Kill session lama kalau ada
tmux kill-session -t mlchecker 2>/dev/null

# Buat session baru detached
tmux new-session -d -s mlchecker -c $BASE_DIR

# Panel 0 - Backend
tmux send-keys -t mlchecker:0 "cd $BASE_DIR/backend && source venv/bin/activate && echo '🔥 Backend starting...' && uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload" C-m

# Split horizontal -> panel 1 frontend
tmux split-window -h -t mlchecker:0 -c $BASE_DIR
tmux send-keys -t mlchecker:0.1 "cd $BASE_DIR/frontend && echo '🎨 Frontend starting...' && npm run dev -- --host 0.0.0.0 --port 3000" C-m

echo "✅ 2 Service jalan di tmux session 'mlchecker'"
echo ""
echo "Buka Browser HP:"
echo "  http://localhost:8000/docs (Backend)"
echo "  http://localhost:3000 (Frontend)"
echo ""
echo "Cara pakai tmux:"
echo "  - Lihat 2 panel: Ctrl+B lalu panah kiri/kanan"
echo "  - Detach: Ctrl+B lalu D"
echo "  - Balik lagi: tmux attach -t mlchecker"
echo "  - Stop semua: tmux kill-session -t mlchecker"
echo ""
tmux attach -t mlchecker
