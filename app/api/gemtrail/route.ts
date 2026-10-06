import { NextResponse } from 'next/server';
import { queryGemmaObservation, checkOllamaHealth } from '@/lib/ollama';
import { ObservationData } from '@/lib/types';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const health = await checkOllamaHealth();
    return NextResponse.json(health, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        online: false,
        model: 'gemma3:1b',
        modelsFound: [],
        message: error instanceof Error ? error.message : 'Server error checking Ollama',
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const observation: ObservationData = body.observation;

    if (!observation) {
      return NextResponse.json(
        { error: 'Missing observation data in request body' },
        { status: 400 }
      );
    }

    const feedback = await queryGemmaObservation(observation);
    return NextResponse.json({ success: true, feedback }, { status: 200 });
  } catch (error) {
    console.error('Error handling /api/gemtrail POST:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to process observation with Gemma 3',
      },
      { status: 500 }
    );
  }
}
