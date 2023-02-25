import { useState } from "react";
import type { NextPage, GetServerSideProps } from "next";

interface SearchDogImage {
    message: string;
    status: string;
}

const fetchDogImage = async () => {
    const res = await fetch("https://dog.ceo/api/breeds/image/random");
    const result = (await res.json()) as SearchDogImage;
    return result;
};

interface CatCategory {
    id: number;
    name: string;
}

interface SearchCatImage {
    breeds: string[];
    categories: CatCategory[];
    id: string;
    url: string;
    width: number;
    height: number;
}

type SearchCatImageResponse = SearchCatImage[];

const fetchCatImage = async () => {
    const res = await fetch("https://api.thecatapi.com/v1/images/search");
    const result = (await res.json()) as SearchCatImageResponse;
    return result[0];
};

interface IndexPageProps {
    initialDogImageUrl: string;
    initialCatImageUrl: string;
}

const IndexPage: NextPage<IndexPageProps> = ({ initialDogImageUrl, initialCatImageUrl }) => {
    const [dogImageUrl, setDogImageUrl] = useState(initialDogImageUrl);
    const [catImageUrl, setCatImageUrl] = useState(initialCatImageUrl);

    const handleDogClick = async () => {
        const dog_image = await fetchDogImage();
        setDogImageUrl(dog_image.message)
    };

    const handleCatClick = async () => {
        const cat_image = await fetchCatImage();
        setCatImageUrl(cat_image.url);
    };

    return (
        <div>
            <div>
                <button
                onClick={handleDogClick}
                style={{
                    backgroundColor: "#319795",
                    border: "none",
                    borderRadius: "4px",
                    color: "white",
                    padding: "4px 8px",
                }}
                >
                きょうのおいぬ🐶
                </button>
                <div style={{ marginTop: 8 }}>
                    <img src={dogImageUrl} width={500} height="auto" />
                </div>
            </div>
            <div>
                <button
                onClick={handleCatClick}
                style={{
                    backgroundColor: "#319795",
                    border: "none",
                    borderRadius: "4px",
                    color: "white",
                    padding: "4px 8px",
                }}
                >
                きょうのにゃんこ🐱
                </button>
                <div style={{ marginTop: 8 }}>
                    <img src={catImageUrl} width={500} height="auto" />
                </div>
            </div>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps<IndexPageProps> = async () => {
    const dogImage = await fetchDogImage();
    const catImage = await fetchCatImage();
    return {
        props: {
            initialDogImageUrl: dogImage.message,
            initialCatImageUrl: catImage.url,
        },
    };
};

export default IndexPage;