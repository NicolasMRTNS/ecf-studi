const books = [
  {
    title: 'Harry Potter 1',
    cover: 'https://images-na.ssl-images-amazon.com/images/I/916DM68L6cS.jpg',
    publishingDate: '2017-10-12',
    description:
      "Le jour de ses onze ans, Harry Potter, un orphelin élevé par un oncle et une tante qui le détestent, voit son existence bouleversée. Un géant vient le chercher pour l'emmener à Poudlard, une école de sorcellerie ! Voler en balai, jeter des sorts, combattre les trolls : Harry se révèle un sorcier doué. Mais un mystère entoure sa naissance et l'effroyable V., le mage dont personne n'ose prononcer le nom.",
    author: 'J.K. Rowling',
    category: 'Roman',
    addedDate: Date.now()
  },
  {
    title: "Björn - Six histoires d'ours",
    cover:
      'https://products-images.di-static.com/image/delphine-perret-bjorn/9782369020653-475x500-1.jpg',
    publishingDate: '2016-09-15',
    description:
      "Voici Björn. Björn est de taille moyenne et de bonne densité. C'est un ours heureux, avec le poil collé par endroits, car il ne sait pas manger du miel proprement. Björn vit dans la forêt avec la belette, le blaireau, l'écureuil, le renard, le hibou, le lièvre et la mésange. Il lui arrive toutes sortes de choses. Parfois aussi il ne lui arrive rien du tout.",
    author: 'Delphine Perret',
    category: 'Album jeunesse',
    addedDate: Date.now()
  },
  {
    title: 'Goupil ou Face',
    cover:
      'https://u-paris.fr/wp-content/uploads/2021/03/album-cover-large-31120.jpg',
    publishingDate: '2016-10-12',
    description:
      "Après des années de questionnements, Lou découvre qu'elle est atteinte de cyclothymie un trouble de l'humeur de la famille des maladies bipolaires. Que faire quand on découvre un petit renard sauvage dans son cerveau ? Peut-on l'apprivoiser, le dompter ? Et comment être heureux quand on doit cohabiter avec une créature si imprévisible ?",
    author: 'Lou Lubie',
    category: 'Roman graphique',
    addedDate: Date.now()
  },
  {
    title: 'Isabella Bird - tome 1',
    cover: 'https://images-na.ssl-images-amazon.com/images/I/711xkhrV4VL.jpg',
    publishingDate: '2017-10-12',
    description:
      "Le Japon du XIXe siècle hors des sentiers battus ! À la fin du XIXe siècle, le Japon s'ouvre au monde et s'occidentalise à marche forcée. Mais le pays reste un vrai mystère pour la plupart des Européens, ce qui en fait une destination de choix pour la célèbre exploratrice anglaise Isabella Bird ! Malgré son jeune âge, elle est déjà connue pour ses écrits sur les terres les plus sauvages. Isabella ne choisit jamais les chemins les plus faciles et, cette fois encore, elle étonne son entourage par son objectif incongru : Ezo, le territoire des Aïnous, une terre encore quasi inexplorée aux confins de l'archipel... Le voyage s'annonce long et difficile, mais rien n'arrête la pétillante jeune femme !",
    author: 'Taiga Sassa',
    category: 'Manga',
    addedDate: Date.now()
  },
  {
    title: 'Les Schtroumpfs - tome 39',
    cover:
      'https://images-na.ssl-images-amazon.com/images/I/51IHAHvlZ5L._SX374_BO1,204,203,200_.jpg',
    publishingDate: '2021-10-08',
    description:
      'Comme chaque année, les premiers frimas sont attendus de pied ferme par les Schtroumpfs, qui se sont bien préparés. Mais personne ne s’attendait à un tel blizzard ! Partis tester une nouvelle luge, les Schtroumpfs Farceur, à Lunettes et Bricoleur se retrouvent coupés d’un village qui s’organise tant bien que mal. Ils trouvent refuge chez un sourcier acariâtre, qui a pourtant tout fait pour fuir la vie en communauté. Et si le salut des uns schtroumpfait par celui des autres ?',
    author: 'Peyo',
    category: 'Bande dessinée',
    addedDate: Date.now()
  }
]

module.exports = books
