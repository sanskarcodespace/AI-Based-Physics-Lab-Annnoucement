import fs from 'fs'
import path from 'path'
import crypto from 'crypto'

const AUDIO_CACHE_DIR = path.join(process.cwd(), 'public/audio_cache')
const LOCAL_TTS_URL = "http://localhost:8000/synthesize"

if (!fs.existsSync(AUDIO_CACHE_DIR)) {
    fs.mkdirSync(AUDIO_CACHE_DIR, { recursive: true })
}

interface TTSOptions {
    text: string
    voice?: string
    rate?: number
    pitch?: number
}

export class TTSEngine {
    static async synthesize(options: TTSOptions): Promise<string> {
        const hash = crypto.createHash('md5').update(JSON.stringify(options)).digest('hex')
        const fileName = `${hash}.wav`
        const filePath = path.join(AUDIO_CACHE_DIR, fileName)
        const publicPath = `/audio_cache/${fileName}`

        // 1. Check Cache
        if (fs.existsSync(filePath)) {
            console.log(`📦 Serving cached audio: ${fileName}`)
            return publicPath
        }

        // 2. Try Online (ElevenLabs) if API Key exists
        if (process.env.ELEVENLABS_API_KEY) {
            try {
                console.log("🌏 Attempting ElevenLabs Synthesis...")
                const audioBuffer = await this.synthesizeElevenLabs(options)
                fs.writeFileSync(filePath, audioBuffer)
                return publicPath
            } catch (error) {
                console.error("⚠️ ElevenLabs Failed, falling back to local:", error)
            }
        }

        // 3. Fallback to Local Python Service
        try {
            console.log("🏠 Attempting Local TTS Synthesis...")
            const audioBuffer = await this.synthesizeLocal(options)
            fs.writeFileSync(filePath, audioBuffer)
            return publicPath
        } catch (error) {
            console.error("❌ Local TTS also failed:", error)
            throw new Error("TTS Synthesis failed across all engines")
        }
    }

    private static async synthesizeElevenLabs(options: TTSOptions): Promise<Buffer> {
        const voiceId = options.voice || "21m00Tcm4TlvDq8ikWAM" // Default Rachel voice
        const url = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'xi-api-key': process.env.ELEVENLABS_API_KEY!
            },
            body: JSON.stringify({
                text: options.text,
                model_id: "eleven_monolingual_v1",
                voice_settings: {
                    stability: 0.5,
                    similarity_boost: 0.5
                }
            })
        })

        if (!response.ok) throw new Error(`ElevenLabs API returned ${response.status}`)

        const arrayBuffer = await response.arrayBuffer()
        return Buffer.from(arrayBuffer)
    }

    private static async synthesizeLocal(options: TTSOptions): Promise<Buffer> {
        const response = await fetch(LOCAL_TTS_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                text: options.text,
                rate: options.rate || 150,
                volume: 1.0,
                voice_index: 0
            })
        })

        if (!response.ok) throw new Error(`Local TTS service returned ${response.status}`)

        const arrayBuffer = await response.arrayBuffer()
        return Buffer.from(arrayBuffer)
    }
}
