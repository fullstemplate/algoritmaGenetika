import { runGeneticAlgorithm } from "@/lib/genetic-algorithm/geneticAlgorithm";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const schedule = await runGeneticAlgorithm();
    return NextResponse.json({ schedule });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error generating schedule" }, { status: 500 });
  }
}
