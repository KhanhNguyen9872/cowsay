import "./App.scss";
import Cowsay from "./components/Cowsay";
import { Helmet, HelmetProvider } from "react-helmet-async";

export default function () {
  return (
    <>
      <HelmetProvider>
        <Helmet prioritizeSeoTags>
          <title>Cowsay</title>
          <meta name="description" content="Cowsay" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0"
          />
        </Helmet>
      </HelmetProvider>
      <Cowsay />
    </>
  );
}
