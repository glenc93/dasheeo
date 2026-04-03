import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const CONFIG_DIR = process.env.NODE_ENV === 'production' ? '/app/config' : path.join(process.cwd(), 'config');
const CONFIG_FILE = path.join(CONFIG_DIR, 'dashboard.json');

async function ensureConfigDir() {
  try {
    await fs.access(CONFIG_DIR);
  } catch {
    await fs.mkdir(CONFIG_DIR, { recursive: true });
  }
}

export async function GET() {
  try {
    await ensureConfigDir();
    const data = await fs.readFile(CONFIG_FILE, 'utf-8');
    return NextResponse.json(JSON.parse(data));
  } catch (error) {
    return NextResponse.json({ widgets: [], settings: {}, theme: {} }, { status: 200 });
  }
}

export async function POST(request: Request) {
  try {
    await ensureConfigDir();
    const config = await request.json();
    await fs.writeFile(CONFIG_FILE, JSON.stringify(config, null, 2));
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save config' }, { status: 500 });
  }
}
