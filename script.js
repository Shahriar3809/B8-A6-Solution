    const btnContainer = document.getElementById('btn-container');
    const videoContainer = document.getElementById('card-container');

    const fetchCatagories = () => {
        fetch('https://openapi.programming-hero.com/api/videos/categories')
        .then(resolve => resolve.json())
        .then(datas=> {
            const data = datas.data;
            data.forEach(card => {
                const newBtn = document.createElement('button');
                newBtn.innerText = card.category;
                newBtn.className = `btn btn-neutral`;
                   btnContainer.appendChild(newBtn);
                newBtn.addEventListener('click', () => {
                    fetchCatagoriesById(card.category_id)
                } )
                
            });
        })
    }

fetchCatagories();

const fetchCatagoriesById = (catagoryId) => {
    ctaID = catagoryId;
    fetch(`https://openapi.programming-hero.com/api/videos/category/${catagoryId}`)
    .then(resolve => resolve.json())
    .then(datas=> {
        const data = datas.data;
        videoContainer.innerHTML = '';
        data.forEach(video => {
                const newVideo = document.createElement('div');
                newVideo.innerHTML = `
                <div class="card w-full bg-base-100 shadow-xl">
                <figure class="overflow-hidden h-72">
                    <img class="w-full" src="./images/smells.jpg" alt="Shoes" />
                    <h6 class="absolute bottom-[40%] right-12">0 hr</h6>
                </figure>
                <div class="card-body">
                    <div class="flex space-x-4 justify-start items-start">
                        <div>
                            <img class="w-12 h-12 rounded-full" src="./images/smells.jpg" alt="Shoes" />
                        </div>
                        <div>
                            <h2 class="card-title">Laugh At My Pain</h2>
                            <div class="flex mt-3">
                                <p class="">Author Name</p>
                                <img class="w-6 h-6" src="./images/verify.png" alt="">
                            </div>
                            <p class="mt-3">100k Views</p>
                        </div>
                    </div>
                </div>
            </div>
                `;
            videoContainer.appendChild(newVideo);
                
                
            });
    })
}

let ctaID = 1000;
fetchCatagoriesById(ctaID)