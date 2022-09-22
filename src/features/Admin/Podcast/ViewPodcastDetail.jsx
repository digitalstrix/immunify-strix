import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import './index.css';
import MainContext from '../../../context/MainContext';

const Viewpodcastdetail = () => {
    const { id } = useParams();
    const context = useContext(MainContext);
    useEffect(() => {
        console.log(id);
    });

    return (
        <>
            <div className="blog-main">
                <video width="400" controls>
                    <source src="/static/videos/podcast/mov_bbb.mp4" type="video/mp4" />
                </video>
                <div className="category">
                    Category 1 | 1st Sep 2022
                </div>
                <div className="title">
                    <h1>Podcast Title</h1>
                </div>
                <div className="content">
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Numquam sequi doloribus quaerat facere fugiat magnam! Provident alias nihil unde in, id facere, impedit aut, similique esse dignissimos sed quis fugiat delectus error aperiam architecto natus molestiae quos labore consectetur quidem odio. Deleniti suscipit tempore deserunt tenetur consequuntur necessitatibus. A perspiciatis nihil eius voluptatum dolorem harum quas culpa temporibus fugiat, quis placeat doloribus? Officia, molestiae magni? At, earum! Eos, velit consequuntur ipsa numquam doloremque distinctio aspernatur, beatae ea atque libero ab id dicta laborum commodi. Omnis, neque porro odit exercitationem inventore ut iusto consequatur recusandae eveniet consequuntur, vitae sed. Molestias ducimus ipsa, ex quo repellat error voluptatem nobis vel fugiat? Hic repudiandae numquam explicabo amet corrupti officiis quis necessitatibus id quibusdam mollitia? Harum itaque labore, non repellendus officiis laudantium? Vitae, labore modi architecto iure, accusantium quae ex eos dolore cupiditate voluptate corrupti omnis minima ut in nostrum natus temporibus harum repellendus nobis corporis neque nesciunt. Animi eum repudiandae, vitae dolorem dicta sapiente assumenda recusandae possimus. Molestias rem nulla numquam explicabo voluptates veritatis fugit, assumenda sed aliquid aut. Suscipit odio voluptatibus totam, modi fugiat incidunt cum dolorum assumenda illo eligendi itaque. Dicta distinctio illum aut adipisci laudantium unde error? Autem, a aliquam? Perspiciatis modi magnam a ducimus dolorum optio velit eaque perferendis, quisquam dolores vero, sed sunt eveniet maiores officiis illo facilis inventore eos culpa aut molestiae pariatur alias. Quo repellendus dolore earum quam vel corrupti cupiditate assumenda quisquam, placeat perferendis porro in laudantium nisi qui recusandae similique expedita dolor eveniet quasi magnam, nostrum quidem sint repudiandae. Fuga iusto quisquam necessitatibus eius rem a totam dolorum veniam quae architecto, harum dolorem ab quo doloremque explicabo quidem minima nesciunt! Libero mollitia ea soluta iusto nam. Quis nihil facilis iusto at incidunt similique corporis error reiciendis quisquam blanditiis in voluptas dolores eligendi praesentium molestiae sed aperiam debitis, voluptatibus dolore. Quo tempore praesentium accusamus ut animi deleniti sed earum. Ab excepturi odio, quaerat placeat eligendi consequuntur, culpa beatae rerum, esse illum maiores similique nesciunt eius cumque! Accusantium ipsa unde odio neque itaque. Illo officia mollitia animi amet dolor omnis maiores, explicabo nam impedit. Dignissimos incidunt quibusdam facilis ad eligendi ut doloribus fuga ducimus. Obcaecati, dolor. Est quos minus facilis ullam quam vero. Qui animi, laborum, totam sapiente dolores voluptatum sequi autem corporis dicta voluptatem mollitia magni quae placeat dolor corrupti rerum error repellendus sint molestiae porro! Ea eaque quae laudantium accusantium officiis nemo fuga dicta, excepturi ipsum animi nisi porro assumenda dolorem quidem ipsam? Est aliquam fugit iusto sapiente nesciunt quisquam labore vitae nostrum, quasi optio dignissimos iure mollitia nemo dicta atque praesentium molestias beatae. Facere perspiciatis reiciendis veniam iure consectetur ipsa eum molestiae tempora, earum architecto eaque iste impedit pariatur, dolorum quibusdam nulla repellendus in harum amet laboriosam. Eum iste id autem minima delectus tenetur, numquam nesciunt, cumque quisquam reiciendis consectetur quae nulla facilis quos a, amet quo veritatis. Nihil mollitia, accusamus molestiae tempora doloremque nemo provident tempore hic consequatur. Nostrum asperiores, labore perferendis impedit, sit hic harum molestiae at eveniet commodi odio atque?</p>
                </div>

            </div>
        </>
    )
}

export default Viewpodcastdetail;
