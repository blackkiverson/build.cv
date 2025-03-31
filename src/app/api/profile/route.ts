import { NextRequest, NextResponse } from 'next/server';
import { dummyProfile } from '@/lib/dummyData';

export async function GET() {
  try {
    // In the future, this will be replaced with socket.io event
    // socket.emit('getProfile', { userId });
    // socket.on('profileData', (data) => { ... });
    
    return NextResponse.json(dummyProfile);
  } catch (error) {
    console.error('Error fetching profile:', error);
    return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // In the future, this will be replaced with socket.io event
    // socket.emit('updateProfile', { userId, data });
    // socket.on('profileUpdated', (result) => { ... });
    
    // For now, just return the updated data
    const updatedProfile = {
      ...dummyProfile,
      ...data,
      lastEdited: new Date().toISOString(),
    };
    
    // Update the dummy data for development
    Object.assign(dummyProfile, updatedProfile);
    
    return NextResponse.json(updatedProfile);
  } catch (error) {
    console.error('Error updating profile:', error);
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
  }
}
