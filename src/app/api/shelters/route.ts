
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


export async function GET(req: NextRequest) {
    return getShelters(req);
};


const getShelters = async (req: NextRequest) => {
    try {
        const shelters = await prisma.shelters.findMany();
        return NextResponse.json({ data: shelters });
    } catch (error) {
        return NextResponse.json({ error: error });
    }
};


export async function POST(req: NextRequest) {
    return createShelter(req);
}

const createShelter = async (req: NextRequest) => {
    const shelter: Shelter = await req.json();
    try {
        if (!shelter.name || !shelter.address || !shelter.city || !shelter.neighborhood || !shelter.qrcode || !shelter.contacts) {
            return NextResponse.json({ error: 'Missing field' }, { status: 400 });
        }
        const createdShelter = await prisma.shelters.create({ data: shelter });
        return NextResponse.json({ data: createdShelter }, { status: 201 });
    } catch (error) {
        console.log("errr")
        console.error(error);
        console.log("errr")
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
};

// export const updateShelter = async (req: NextApiRequest, res: NextApiResponse) => {
//     const { id }: { id?: string } = req.query;
//     const { shelter }: { shelter: Shelter } = req.body;
//     try {
//         if (!id) {
//             return res.status(400).json({ error: 'Missing ID' });
//         }
//         if (!shelter.name || !shelter.address || !shelter.city || !shelter.neighborhood || !shelter.qrcode || !shelter.contacts) {
//             return res.status(400).json({ error: 'Missing field' });
//         }
//         const updatedShelter = await prisma.shelters.update({ where: { id: id }, data: shelter });
//         res.status(200).json(updatedShelter);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// };