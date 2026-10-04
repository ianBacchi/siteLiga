/* ==========================================================================
   CONFIGURAÇÃO DO SITE — edite só este arquivo para atualizar o conteúdo.
   ========================================================================== */
window.LIGA = {

  /* ---------- Feeds automáticos ----------
     LinkedIn e Instagram não liberam os posts de graça para sites.
     A solução é um "widget" gratuito que puxa os posts sozinho:

     INSTAGRAM → https://behold.so (grátis)
       1. Crie a conta e conecte o Instagram @ligautfpr
       2. Crie um feed do tipo "JSON" e copie a URL (https://feeds.behold.so/XXXX)
       3. Cole em instagramFeedUrl abaixo

     LINKEDIN → https://www.sociablekit.com (plano grátis)
       1. Crie um widget "LinkedIn Page Posts" com a página /company/ligafinanceira
       2. Copie o "embed id" (um número) e cole em linkedinWidgetId abaixo

     Enquanto estiverem vazios, o site mostra as fotos/posts de exemplo abaixo. */
  instagramFeedUrl: "",
  linkedinWidgetId: "",

  /* Posts reais do @ligautfpr (out/2026), salvos em img/instagram/.
     Usados enquanto o feed automático não está ligado. video: true mostra o ícone de Reels. */
  instagramFallback: [
    { img: "img/instagram/post1.jpg",  link: "https://www.instagram.com/reel/DdjUx9Lxulv/", video: true, legenda: "Bate-bola da Money Week! Uma pessoa, várias escolhas e pouco tempo para pensar." },
    { img: "img/instagram/post2.webp", link: "https://www.instagram.com/p/DdUQnkWlBLG/",    legenda: "Money Week foi isso: dois dias imersos no mercado financeiro, e a Liga esteve lá de perto." },
    { img: "img/instagram/post3.jpg",  link: "https://www.instagram.com/reel/DdRTNazxryY/", video: true, legenda: "Crachá no peito, câmera na mão e muita vontade de aprender. A Money Week foi vivida em cada detalhe." },
    { img: "img/instagram/post4.jpg",  link: "https://www.instagram.com/reel/Dc9YamJyCy6/", video: true, legenda: "Se você tivesse que definir o mercado financeiro em uma única palavra, qual seria?" },
    { img: "img/instagram/post5.jpg",  link: "https://www.instagram.com/reel/Dc1caFmPIBl/", video: true, legenda: "Um conselho especial para a Liga, direto da Money Week." },
    { img: "img/instagram/post6.jpg",  link: "https://www.instagram.com/reel/Dcod_sTTSKG/", video: true, legenda: "Gabriel veio de Apucarana com a Liga para participar do QG Talent." }
  ],

  /* Posts do LinkedIn mostrados enquanto o widget não está ligado. */
  linkedinFallback: [
    { data: "Out 2025", titulo: "Imersão GROWY na EQI Investimentos",
      texto: "Membros da Liga participaram da imersão GROWY na sede da EQI Investimentos, em Balneário Camboriú (SC).",
      img: "img/b3-trading.jpg" },
    { data: "Jul 2025", titulo: "Expert XP 2025",
      texto: "Estivemos na edição de 15 anos da Expert XP, no São Paulo Expo — o maior evento de investimentos do mundo.",
      img: "img/b3.jpg" },
    { data: "2025", titulo: "Z Summit",
      texto: "Participamos do Z Summit em São Paulo, evento focado em educação de investimentos para a Geração Z.",
      img: "img/nyse.jpg" }
  ],

  /* ---------- Links (substitui o Beacons) ----------
     Aparecem na seção "Links" do site e na página links.html (use ela na bio).
     destaque: true deixa o botão dourado. */
  links: [
    { titulo: "Processo Seletivo",        descricao: "Inscreva-se para fazer parte da Liga", url: "#", destaque: true },
    { titulo: "Instagram",                descricao: "@ligautfpr",                            url: "https://www.instagram.com/ligautfpr/" },
    { titulo: "LinkedIn",                 descricao: "Liga de Mercado Financeiro UTFPR",      url: "https://www.linkedin.com/company/ligafinanceira/" },
    { titulo: "Fale com a gente",         descricao: "Parcerias, palestras e dúvidas",        url: "#" } // troque por "mailto:email-da-liga@..."
  ],

  /* ---------- Diretoria ----------
     Coloque as fotos em img/equipe/ (ex.: img/equipe/joao.jpg). Sem foto, aparece a inicial. */
  fotoEquipe: "",  // foto do time todo, ex.: "img/equipe/time.jpg"
  diretoria: [
    { nome: "Thiago Bachiegga", cargo: "Presidente",               foto: "", linkedin: "" },
    { nome: "Vitória Pedron", cargo: "Vice-presidente",            foto: "", linkedin: "" },
    { nome: "Nome Sobrenome", cargo: "Diretor(a) de Research",     foto: "", linkedin: "" },
    { nome: "Nome Sobrenome", cargo: "Diretor(a) de Marketing",    foto: "", linkedin: "" },
    { nome: "Tiago Ferreira Ribeiro", cargo: "Professor orientador", foto: "", linkedin: "" }
  ]
};
