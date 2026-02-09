import pyttsx3
import os
import hashlib
from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse
from pydantic import BaseModel

app = FastAPI()

# Configuration
CACHE_DIR = "cache"
if not os.path.exists(CACHE_DIR):
    os.makedirs(CACHE_DIR)

class SpeechRequest(BaseModel):
    text: str
    rate: int = 150
    volume: float = 1.0
    voice_index: int = 0

def get_text_hash(text: str, rate: int, volume: float, voice_index: int):
    config_str = f"{text}|{rate}|{volume}|{voice_index}"
    return hashlib.md5(config_str.encode()).hexdigest()

@app.post("/synthesize")
async def synthesize(request: SpeechRequest):
    try:
        file_hash = get_text_hash(request.text, request.rate, request.volume, request.voice_index)
        file_path = os.path.join(CACHE_DIR, f"{file_hash}.wav")

        if os.path.exists(file_path):
            return FileResponse(file_path, media_type="audio/wav")

        engine = pyttsx3.init()
        
        # Set properties
        engine.setProperty('rate', request.rate)
        engine.setProperty('volume', request.volume)
        
        voices = engine.getProperty('voices')
        if request.voice_index < len(voices):
            engine.setProperty('voice', voices[request.voice_index].id)

        # Save to file
        engine.save_to_file(request.text, file_path)
        engine.runAndWait()
        
        # Check if file was created (pyttsx3 is sometimes finicky with runAndWait)
        if not os.path.exists(file_path):
             raise HTTPException(status_code=500, detail="Failed to generate audio file")

        return FileResponse(file_path, media_type="audio/wav")

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/voices")
async def get_voices():
    engine = pyttsx3.init()
    voices = engine.getProperty('voices')
    return [{"id": v.id, "name": v.name, "languages": v.languages} for v in voices]

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
