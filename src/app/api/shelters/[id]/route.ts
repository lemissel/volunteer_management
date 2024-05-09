
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

interface Shelter {
    id: string;
    name: string;
    address: string;
    city: string;
    neighborhood: string;
    qrcode: string;
    contacts: string[];
};


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


export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    return updateShelterById(req, params.id);
};

const updateShelterById = async (req: NextRequest, id: string) => {
    try {
        if (!id) {
            return NextResponse.json({ error: 'Missing ID' }, { status: 400 });
        }
        const shelter: Shelter = await req.json();
        if (!shelter.name || !shelter.address || !shelter.city || !shelter.neighborhood || !shelter.qrcode || !shelter.contacts) {
            return NextResponse.json({ error: 'Missing field' }, { status: 400 });
        }
        const updatedShelter = await prisma.shelters.update({ where: { id: id }, data: shelter });
        return NextResponse.json({ data: updatedShelter }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
};

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    return deleteShelterById(params.id);
};

const deleteShelterById = async (id: string) => {
    try {
        if (!id) {
            return NextResponse.json({ error: 'Missing ID' }, { status: 400 });
        }
        const deletedShelter = await prisma.shelters.delete({ where: { id: id } });
        return NextResponse.json({ data: deletedShelter }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}