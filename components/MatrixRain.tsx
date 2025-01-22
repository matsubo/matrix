"use client"

import { useEffect, useRef } from "react"

const MatrixRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const secretMessage = "おまえのかーちゃんでーべそ"
  const encryptedMessage = secretMessage
    .split("")
    .map((char) => String.fromCharCode(char.charCodeAt(0) + 1))
    .join("")

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const katakana = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン"
    const latin = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const nums = "0123456789"
    const alphabet = katakana + latin + nums

    const fontSize = 16
    const columns = canvas.width / fontSize

    const rainDrops: number[] = []

    for (let x = 0; x < columns; x++) {
      rainDrops[x] = 1
    }

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = "#0F0"
      ctx.font = fontSize + "px monospace"

      for (let i = 0; i < rainDrops.length; i++) {
        let text
        if (i % 50 === 0 && Math.floor(rainDrops[i]) % 20 === 0) {
          const charIndex = Math.floor(rainDrops[i] / 20) % encryptedMessage.length
          text = encryptedMessage[charIndex]
        } else {
          text = alphabet.charAt(Math.floor(Math.random() * alphabet.length))
        }
        const isKatakana = text.charCodeAt(0) >= 0x30a0 && text.charCodeAt(0) <= 0x30ff
        const shouldReverse = isKatakana && Math.random() < 0.8

        ctx.save()
        ctx.translate(i * fontSize, rainDrops[i] * fontSize)
        if (shouldReverse) {
          ctx.scale(-1, 1)
          ctx.translate(-fontSize, 0)
        }
        ctx.fillText(text, 0, 0)
        ctx.restore()

        if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          rainDrops[i] = 0
        }
        rainDrops[i]++
      }
    }

    const interval = setInterval(draw, 30)

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)

    return () => {
      clearInterval(interval)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full" />
}

export default MatrixRain

