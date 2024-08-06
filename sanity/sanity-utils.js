import { createClient, groq } from "next-sanity";

const client = createClient({
  projectId: "6ake5ew6",
  dataset: "production",
  apiVersion: "2024-04-16",
});

export default client;

export async function getWork() {
  return client.fetch(
    groq`*[_type == "work"]|order(orderRank){..., "cooperations": cooperations[]->{title, slug}, "clients": clients[]->{title, slug}, "disciplines": disciplines[]->{title, slug}, images[]{..., "asset": asset->{...}},
    
        images[]{
      _type == "media" => {
        type, 
        "media": select(
          type == "image" => {
            "url": image.asset->url,
            "alt": image.alt,
            "color": image.asset->metadata.palette.lightVibrant.background,
            "fitType": image.fitType,
            "background": image.background
          },
          type == "video" => {
            "url": video.asset->url,
              "color": image.asset->metadata.palette.lightVibrant.background,
            "fitType": image.fitType,
            "background": image.background,
            "alt": image.alt,
          }
        )
      }
    }
    
    }`
  );
}

export async function getDisciplines() {
  return client.fetch(groq`*[_type == "disciplines"]{...}`);
}

export async function getClients() {
  return client.fetch(groq`*[_type == "clients"]{...}`);
}

export async function getCooperations() {
  return client.fetch(groq`*[_type == "cooperations"]{...}`);
}

export async function getImprint() {
  return client.fetch(groq`*[_type == "imprint"]{...}`);
}

export async function getPrivacy() {
  return client.fetch(groq`*[_type == "privacy"]{...}`);
}
