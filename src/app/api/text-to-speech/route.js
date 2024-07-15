import OpenAI from 'openai';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const { text, apiKey, voice } = await req.json();

  if (!text || !apiKey) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const openai = new OpenAI({ apiKey });

  try {
    const mp3 = await openai.audio.speech.create({
      model: "tts-1",
      voice: voice || "alloy",
      input: text,
    });

    const buffer = Buffer.from(await mp3.arrayBuffer());
    const base64Audio = buffer.toString('base64');

    return NextResponse.json({ audioUrl: `data:audio/mp3;base64,${base64Audio}` });
  } catch (error) {
    console.error('OpenAI API error:', error);
    return NextResponse.json({ error: 'Failed to generate speech' }, { status: 500 });
  }
}