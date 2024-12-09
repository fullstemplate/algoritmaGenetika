import { NextResponse } from 'next/server';
import { geneticAlgorithm } from '@/lib/genetic-algorithm/geneticAlgorithm';

export async function GET() {
  try {
    const bestSchedule = await geneticAlgorithm(); // Ambil jadwal terbaik
    return NextResponse.json(bestSchedule); // Kirim hanya jadwal terbaik
  } catch (error) {
    console.error('Error in API Route:', error);
    return NextResponse.json({ error: 'Failed to generate schedule' });
  }
}
