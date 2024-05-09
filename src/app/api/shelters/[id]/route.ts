
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();


export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    return getShelterById(params.id);
};

const getShelterById = async (id: string) => {
    try {
        if (!id) {
            return NextResponse.json({ error: 'Missing ID' }, { status: 400 });
        }
        const shelter = await prisma.shelters.findUnique({ where: { id: id as string } });
        return NextResponse.json({ data: shelter }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
};