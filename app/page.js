import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Image from "next/image";

const url = `${process.env.BASE_URL}/spaces/${process.env.SPACE_ID}/environments/master/entries?access_token=${process.env.ACCESS_TOKEN}`;

const options = {
  renderText: (text) => {
    return text.split("\n").reduce((children, textSegment, index) => {
      return [...children, index > 0 && <br key={index} />, textSegment];
    }, []);
  },
};

export default async function Home() {
  const response = await fetch(url, {
    cache: "no-store",
  });

  if (!response.ok) {
    console.error("Failed to fetch data");
    return <div>Failed to load content.</div>;
  }
  const data = await response.json();

  if (!data.items || !data.includes) {
    console.error("Invalid data structure", data);
    return <div>Invalid content structure</div>;
  }
  return (
    <main>
      {data.items.map((item, i) => {
        const image = data.includes.Asset.find(
          (asset) => asset.sys.id === item?.fields?.image?.sys?.id
        );

        const imageUrl = image?.fields?.file?.url;
        const fullImageUrl = imageUrl ? `https:${imageUrl}` : null;

        return (
          <div key={i}>
            <h1 className="text-3xl font-bold px-24">{item?.fields?.title}</h1>
            <div className="py-4 px-24">
              {documentToReactComponents(item?.fields?.body)}
            </div>
            {fullImageUrl && (
              <Image
                src={fullImageUrl}
                width={500}
                height={500}
                alt={item?.fields?.title || "blog image"}
              />
            )}
          </div>
        );
      })}
    </main>
  );
}
