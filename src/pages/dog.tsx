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

interface IndexPageProps {
    initialDogImageUrl: string;
}

const IndexPage: NextPage<IndexPageProps> = ({ initialDogImageUrl }) => {
    const [dogImageUrl, setDogImageUrl] = useState(initialDogImageUrl);

    const handleClick = async () => {
        const image = await fetchDogImage();
        setDogImageUrl(image.message)
    };

    return (
        <div>
            <button
            onClick={handleClick}
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
                <img src={catImageUrl} width="auto" height="auto" />
            </div>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps<IndexPageProps> = async () => {
    const dogImage = await fetchDogImage();
    return {
        props: {
            initialDogImageUrl: dogImage.message,
        },
    };
};

export default IndexPage;