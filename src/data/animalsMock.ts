export interface Animal {
  id: number;
  name: string;
  status: string;
  image: string;
  vaccinated: boolean;
  dewormed: boolean;
  sterilized: boolean;
  gender: 'Mascul' | 'Femelă';
  age: string;
  size: string;
  shelter: string;
}

export const mockAnimals: Animal[] = [
  {
    id: 1,
    name: 'Bruno',
    status: 'Disponibil',
    image: '../assets/dog-icon.svg', // poți pune orice imagine sau iconiță
    vaccinated: true,
    dewormed: true,
    sterilized: true,
    gender: 'Mascul',
    age: '2 ani',
    size: 'talie medie',
    shelter: 'Adăpostul Lăbuțe din Copou',
  },
  {
    id: 2,
    name: 'Luna',
    status: 'Disponibil',
    image: '../assets/dog-icon.svg',
    vaccinated: true,
    dewormed: true,
    sterilized: false,
    gender: 'Femelă',
    age: '5 luni',
    size: 'talie mică',
    shelter: 'Casa lui Azor',
  },
  {
    id: 3,
    name: 'Zara',
    status: 'Disponibil',
    image: '../assets/dog-icon.svg',
    vaccinated: true,
    dewormed: true,
    sterilized: true,
    gender: 'Femelă',
    age: '3 ani',
    size: 'talie medie',
    shelter: 'Casa lui Azor',
  },
];

export const fetchAnimals = async (): Promise<Animal[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockAnimals);
    }, 300);
  });
};

