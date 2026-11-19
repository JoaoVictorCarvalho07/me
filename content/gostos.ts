export type TasteItem = {
  title: string;
  sub: string;
  badge?: string;
  href?: string;
  image?: string;
};

export type TasteGroup = {
  id: string;
  title: string;
  genres?: string[];
  label?: string;
  items: TasteItem[];
};

export const gostos: TasteGroup[] = [
  {
    id: "musica",
    title: "Música",
    genres: ["Musical", "Rock alternativo", "Pop Rock", "Pop", "Lo-fi / Chillhop"],
    label: "Álbuns e artistas favoritos",
    items: [
      {
        title: "Epic the musical",
        sub: "Jorge Rivera-Herrans · 2024",
        badge: "Álbum",
        href: "https://open.spotify.com/playlist/3sdEH7HfFE3d4xry5RnnLr?si=826710ef870d4832",
        image:
          "https://static.wikia.nocookie.net/epicthemusical/images/3/3e/Epic_The_Musical_Album_Cover.png/revision/latest?cb=20241230083621",
      },
      {
        title: "Linkin Park",
        sub: "Linkin Park · 2000",
        badge: "Artista",
        href: "https://open.spotify.com/intl-pt/artist/6XyY86QOPPrYVGvF9ch6wz?si=CM9l_GNJRKuCzYVZrd6GFQ",
        image: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Linkin_Park_logo_2014.jpg",
      },
      {
        title: "Lost in the echo",
        sub: "Linkin Park · 2012",
        badge: "Música",
        href: "https://open.spotify.com/intl-pt/track/2oNYsdCasRRlz1shXFAz7D?si=cbb6973417274aae",
        image: "https://upload.wikimedia.org/wikipedia/pt/c/c9/Linkin_Park_-_Living_Things.jpg",
      },
      {
        title: "Skillet",
        sub: "Skillet · 1996",
        badge: "Artista",
        href: "https://open.spotify.com/intl-pt/artist/49bzE5vRBRIota4qeHtQM8?si=sHe3pig_R3O1xmYDoXBoBw",
        image: "https://fontmeme.com/images/rise-skillet-album.jpg",
      },
      {
        title: "Lofi girl",
        sub: "lofi girl · beats to relax/study to",
        badge: "álbum",
        href: "https://open.spotify.com/playlist/0vvXsWCC9xrXsKd4FyS8kM?si=98a64be2005d497f",
        image:
          "https://images.squarespace-cdn.com/content/v1/580fbaac440243d8731ffc57/46cb49b3-63d7-40e1-9cd0-540fbecdc39c/Lofi+Girl+16x9.jpeg",
      },
      {
        title: "Meu No Repeat",
        sub: "playlist automática do Spotify",
        badge: "álbum",
        href: "https://open.spotify.com/playlist/37i9dQZF1Epl8bTz2FTAZG?si=299c47df49604e14",
        image: "https://pickasso.spotifycdn.com/image/ab67c0de0000deef/dt/v1/img/repeat/or/es",
      },
    ],
  },
  {
    id: "tela",
    title: "Séries, filmes e animes",
    genres: ["ação", "aventura", "Tecnologia", "Drama", "Ficção científica", "Animes"],
    label: "O que assisti e recomendo",
    items: [
      {
        title: "That time I got reincarnated as a slime",
        sub: "Crunchyroll · 2018",
        badge: "Anime",
        href: "https://www.crunchyroll.com/pt-br/series/GYZJ43JMR/that-time-i-got-reincarnated-as-a-slime",
        image: "https://pbs.twimg.com/media/EyrFJTqW8AIjTJr.jpg",
      },
      {
        title: "Avatar: The Last Airbender",
        sub: "Netflix · 2005",
        badge: "Série",
        href: "https://www.netflix.com/search?q=avatar%20&jbv=70142405",
        image: "https://upload.wikimedia.org/wikipedia/pt/8/86/Avatar_Aang.png",
      },
      {
        title: "How to Train Your Dragon",
        sub: "Prime Video · 2010",
        badge: "Filme",
        href: "https://www.primevideo.com/-/pt/detail/0M6IL90MHWOVU4BTTNA1WM06Z1/ref=atv_dp_amz_c_yxuuUK_2_1",
        image: "https://upload.wikimedia.org/wikipedia/pt/e/ed/How_to_Train_Your_Dragon_%28filme_de_2010%29.jpg",
      },
    ],
  },
  {
    id: "leituras",
    title: "Leituras",
    genres: ["fantasia", "Ficção científica"],
    label: "Obras que li e recomendo",
    items: [
      {
        title: "The Beginning After the End",
        sub: "TurtleMe",
        badge: "Lido",
        image: "https://static.wikia.nocookie.net/thebate/images/c/c6/Tapas_Novel_Cover.png/revision/latest?cb=20200209071556",
      },
      {
        title: "Shadow slave",
        sub: "Guiltythree",
        badge: "Lendo",
        image: "https://img.wattpad.com/cover/380279556-288-k29662.jpg",
      },
      {
        title: "The primal hunter",
        sub: "Zogarth",
        badge: "Acompanhando",
        image: "https://rlemay.com.au/wp-content/uploads/2024/04/primal-hunter-feature.jpg",
      },
      {
        title: "That time I got reincarnated as a slime",
        sub: "Fuse",
        badge: "Lido",
        image: "https://pbs.twimg.com/media/EyrFJTqW8AIjTJr.jpg",
      },
    ],
  },
  {
    id: "jogos",
    title: "Jogos",
    genres: ["RPG", "Puzzle / Strategy", "Ação & Aventura", "moba"],
    label: "Jogos que marcaram",
    items: [
      { title: "League of Legends", sub: "PC", badge: "PC" },
      { title: "Minecraft", sub: "PC", badge: "PC" },
    ],
  },
  {
    id: "ferramentas",
    title: "Ferramentas que uso todo dia",
    items: [
      { title: "VS Code", sub: "Editor principal" },
      { title: "GitHub", sub: "Versionamento" },
      { title: "IntelliJ", sub: "IDE Java" },
      { title: "Obsidian", sub: "Notas e conhecimento" },
      { title: "Claude", sub: "IA para código" },
      { title: "Gemini", sub: "IA do dia a dia" },
    ],
  },
];

/**
 * TODO: capas de League of Legends e Minecraft no site antigo vinham de thumbs
 * instáveis do Google. Ficaram sem imagem até haver um arquivo local.
 */
