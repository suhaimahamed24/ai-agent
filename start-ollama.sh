#!/bin/bash
ollama serve &

echo "Waiting for ollama to start..."
until ollama list > /dev/null 2>&1; do
  sleep 2
done

echo "Pulling llama3..."
ollama pull gemma3:1b

echo "Done! Ollama is ready."
wait