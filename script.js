    const btnContainer = document.getElementById('btn-container');
    const videoContainer = document.getElementById('card-container');
    const errorElement = document.getElementById('error-element');
    const sortBTN = document.getElementById('sortBTN');

    

let ctaID = 1000;
let sorted = false;
sortBTN.addEventListener('click', () => {
        sorted = true;
        fetchCatagoriesById(ctaID, sorted)
    })

    const fetchCatagories = () => {
        fetch('https://openapi.programming-hero.com/api/videos/categories')
        .then(resolve => resolve.json())
        .then(datas=> {
            const data = datas.data;
            data.forEach(card => {
                const newBtn = document.createElement('button');
                newBtn.innerText = card.category;
                newBtn.className = `btn btn-neutral cata-btn`;
                   btnContainer.appendChild(newBtn);
                newBtn.addEventListener('click', () => {
                    
                    const allbtn = document.querySelectorAll('.cata-btn')
                    for(let btn of allbtn) {
                        btn.classList.remove('bg-red-500')
                    }
                    newBtn.classList.add('bg-red-500');

                    fetchCatagoriesById(card.category_id)
                } )
                
            });
        })
    }

fetchCatagories();

const fetchCatagoriesById = (catagoryId, sorted) => {
    ctaID = catagoryId;

    fetch(`https://openapi.programming-hero.com/api/videos/category/${catagoryId}`)
    .then(resolve => resolve.json())
    .then(datas=> {
        
        


        const data = datas.data;
        videoContainer.innerHTML = '';
        if(data.length === 0) {
            errorElement.classList.remove('hidden')
        } else {
            errorElement.classList.add('hidden')
        }

        if(sorted) {
            data.sort((a, b) => {
                const first = a.others.views;
                const converted = parseInt(first.replace('K', ''))
                const second = b.others.views;
                const converted2 = parseInt(second.replace('K', ''))
                return converted - converted2;
            })
        }


        data.forEach(video => {
                let verifiedBadge = '';
                if(video.authors[0].verified){
                    verifiedBadge = `<img class="w-6 h-6" src="./icon.svg" alt="">`;
                }
                const newVideo = document.createElement('div');
                newVideo.innerHTML = `
                <div class="card w-full bg-base-100 shadow-xl">
                <figure class="overflow-hidden h-72">
                    <img class="w-full" src="${video.thumbnail}" />
                    <h6 class="absolute bottom-[40%] right-12">0 hr</h6>
                </figure>
                <div class="card-body">
                    <div class="flex space-x-4 justify-start items-start">
                        <div>
                            <img class="w-12 h-12 rounded-full" src="${video.authors[0].
profile_picture}" alt="Shoes" />
                        </div>
                        <div>
                            <h2 class="card-title">${video.title}</h2>
                            <div class="flex mt-3">
                                <p class="">${video.authors[0].profile_name}</p>
                                ${verifiedBadge}
                            </div>
                            <p class="mt-3">${video.others.views}</p>
                        </div>
                    </div>
                </div>
            </div>
                `;
            videoContainer.appendChild(newVideo);
                
                
            });
    })
}


fetchCatagoriesById(ctaID, sorted)