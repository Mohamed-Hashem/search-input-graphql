import { useParams } from "react-router-dom";

export default function DetailPage() {
    const { id } = useParams();

    return <h1>Page Id : {id}</h1>;
}
