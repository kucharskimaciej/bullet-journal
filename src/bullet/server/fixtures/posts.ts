import {Posts} from '../../collections/posts/posts';

const posts = [
    {
        title: 'Sorores Parnasi Achaidos',
        body: `Lorem markdownum arcuit: dum illos reticere inplicet reserabo? Contra celebrant
dei neque transit: est sortis rabieque nautas. Thestiadae fecundo **valuere
saevam**, per est dirusque, ut faciente referam humus, praecedentem mirantur
rigidi. Sorores Parnasi Achaidos saetis, conclamat cuius arva atque sola coepto
et mirabile, nec.
- Promptum dixit
- Ferebam tua pictas suam euntem mixtaeque peteret
- Que terras Stygio
- Cecinit riget fuit
- Frenataque nomine`
    },
    {
        title: 'Ac coepi vertice unam. ',
        body: `Vetus Iovem artifices absistit clavigeram foret, sui
Cupido reposcunt [edita](http://www.raynelongboards.com/), non Hippotadaeque
numero. Dictys ture [verbis](http://hipstermerkel.tumblr.com/), superat
[sospes](http://eelslap.com/)!`
    },
    {
        title: 'Nec multo quam inicit spatiantes altera',
        body: `Retinebat aequora carpe poterat temptat suis madentis sudantibus ille, illa.
Cephea titulis et viribus iactum petis Amor caeleste. Opes cuncta aprica Phoebo
in inscribenda longos in voragine cognita vestigia silvam flammae cuius harenae
membris quod iussit. Quae consilium, prostravit, coronat **caeleste quos**.`
    }
];

Meteor.methods({
    seedPosts() {
        let userId = Meteor.userId();

        if (!userId) {
            return;
        }

        if (Posts.find({ author: userId }).count() === 0) {
            posts.forEach((post) => {
                Meteor.call('createPost', post);
            });
        }
    }
});