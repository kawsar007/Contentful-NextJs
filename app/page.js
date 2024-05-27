import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

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
  const data = await response.json();
  console.log(data);
  return (
    <main>
      {data.items.map((item, i) => (
        <div key={i}>
          <h1 className="text-3xl font-bold px-24">{item.fields?.title}</h1>
          <div className="py-4 px-24">
            {documentToReactComponents(item.fields?.body)}
          </div>
        </div>
      ))}
    </main>
  );
}
