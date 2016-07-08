import {Meteor} from 'meteor/meteor';
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

const kitchenSinkTitle = 'Markdown kitchensink!';
const kitchenSink = {
    title: kitchenSinkTitle,
    body:`
[View raw (TEST.md)](https://raw.github.com/adamschwartz/github-markdown-kitchen-sink/master/README.md)

This is a paragraph.

    This is a paragraph.



Header 1
========

Header 2
--------

    Header 1
    ========

    Header 2
    --------



# Header 1
## Header 2
### Header 3
#### Header 4
##### Header 5
###### Header 6

    # Header 1
    ## Header 2
    ### Header 3
    #### Header 4
    ##### Header 5
    ###### Header 6



# Header 1 #
## Header 2 ##
### Header 3 ###
#### Header 4 ####
##### Header 5 #####
###### Header 6 ######

    # Header 1 #
    ## Header 2 ##
    ### Header 3 ###
    #### Header 4 ####
    ##### Header 5 #####
    ###### Header 6 ######



> Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aliquam hendrerit mi posuere lectus. Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus.

    > Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aliquam hendrerit mi posuere lectus. Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus.



> ## This is a header.
> 1. This is the first list item.
> 2. This is the second list item.
>
> Here's some example code:
>
>     Markdown.generate();

    > ## This is a header.
    > 1. This is the first list item.
    > 2. This is the second list item.
    >
    > Here's some example code:
    >
    >     Markdown.generate();




- Red
- Green
- Blue


+ Red
+ Green
+ Blue


* Red
* Green
* Blue


\`\`\`markdown
    - Red
    - Green
    - Blue

    + Red
    + Green
    + Blue

    * Red
    * Green
    * Blue
\`\`\`

1. Buy flour and salt
1. Mix together with water
1. Bake

\`\`\`markdown
    1. Buy flour and salt
    1. Mix together with water
    1. Bake
\`\`\`



Paragraph:

    Code

<!-- -->

    Paragraph:

        Code



* * *

***

*****

- - -

---------------------------------------

    * * *

    ***

    *****

    - - -

    ---------------------------------------



This is [an example](http://example.com "Example") link.

[This link](http://example.com) has no title attr.

This is [an example] [id] reference-style link.

[id]: http://example.com "Optional Title"

    This is [an example](http://example.com "Example") link.

    [This link](http://example.com) has no title attr.

    This is [an example] [id] reference-style link.

    [id]: http://example.com "Optional Title"



*single asterisks*

_single underscores_

**double asterisks**

__double underscores__

    *single asterisks*

    _single underscores_

    **double asterisks**

    __double underscores__



This paragraph has some \`code\` in it.

    This paragraph has some \`code\` in it.



![Alt Text](http://placehold.it/200x50 "Image Title")

    ![Alt Text](http://placehold.it/200x50 "Image Title")
`
};

Meteor.methods({
    seedPosts() {
        let userId = Meteor.userId();

        if (!userId) {
            return;
        }

        if (Posts.find({ author: userId, removed: false }).count() === 0) {
            posts.forEach((post) => {
                Meteor.call('createPost', post);
            });
        }
    },
    removeAllPosts() {
        let userId = Meteor.userId();

        if (!userId) {
            return;
        }

        Posts.remove({author: userId});
    },
    kitchenSink() {
        let userId = Meteor.userId();

        if (!userId) {
            return;
        }

        Posts.remove({
            author: userId,
            title: kitchenSinkTitle
        });

        Meteor.call('createPost', kitchenSink);
    },
});