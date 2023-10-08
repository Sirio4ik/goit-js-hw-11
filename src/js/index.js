// // import Notiflix from 'notiflix';
// // import { Notify } from 'notiflix/build/notiflix-notify-aio';
// // import ImagesApiService from './pixabay';
// // import SimpleLightbox from 'simplelightbox';
// // import 'simplelightbox/dist/simple-lightbox.min.css';

// // const imageApiService = new ImagesApiService();
// // const form = document.querySelector('.search-form');
// // const gallery = document.querySelector('.gallery');
// // const loadMoreButton = document.querySelector('.load-more');
// // let lightbox;

// // form.addEventListener('submit', loadImages);
// // loadMoreButton.addEventListener('click', loadMore);

// // async function loadImages(e) {
// //   e.preventDefault();
// //   loadMoreButton.classList.add('is-hidden');
// //   gallery.innerHTML = '';
// //   imageApiService.query = e.currentTarget.elements.searchQuery.value.trim();
// //   imageApiService.resetPage();

// //   if (imageApiService.query === '') {
// //     Notify.info('Please enter your search query!');
// //     return;
// //   }

// //   try {
// //     const data = await imageApiService.getImage();
// //     let queriesArray = data.hits;

// //     if (queriesArray.length === 0) {
// //       Notify.failure(
// //         'Sorry, there are no images matching your search query. Please try again.'
// //       );
// //     } else {
// //       renderGalleryMarkup(queriesArray);
// //       Notify.success(`Hooray! We found ${data.totalHits} images.`);
// //       loadMoreButton.classList.toggle('is-hidden', queriesArray.length < 40);
// //       lightboxInit();
// //     }
// //   } catch (error) {
// //     Notify.ifailure(
// //       "We're sorry, but you've reached the end of search results."
// //     );
// //     console.log(error);
// //   }
// // }

// // async function loadMore() {
// //   try {
// //     const data = await imageApiService.getImage();
// //     let queriesArray = data.hits;
// //     renderGalleryMarkup(queriesArray);
// //     loadMoreButton.classList.toggle('is-hidden', queriesArray.length < 40);
// //     lightboxInit();
// //   } catch (error) {
// //     console.log(error);
// //   }
// // }

// // function renderGalleryMarkup(queriesArray) {
// //   let markup = '';

// //   queriesArray.forEach(item => {
// //     markup += `<a href="${item.largeImageURL}" class="lightbox-target">
// //       <div class="photo-card">
// //         <div class="thumb"><img src="${item.webformatURL}" alt="${item.tags}" loading="lazy" /></div>
// //         <div class="info">
// //           <p class="info-item">
// //             <b>Likes</b><span>${item.likes}</span>
// //           </p>
// //           <p class="info-item">
// //             <b>Views</b><span>${item.views}</span>
// //           </p>
// //           <p class="info-item">
// //             <b>Comments</b><span>${item.comments}</span>
// //           </p>
// //           <p class="info-item">
// //             <b>Downloads</b><span>${item.downloads}</span>
// //           </p>
// //         </div>
// //       </div>
// //     </a>`;
// //   });

// //   gallery.insertAdjacentHTML('beforeend', markup);
// // }

// // function lightboxInit() {
// //   if (lightbox) {
// //     lightbox.refresh();
// //   } else {
// //     lightbox = new SimpleLightbox('.lightbox-target');
// //   }
// // }
// import { refs } from './refs';
// import { fetchSearchQueryData } from './pixabay-api';
// import { createGalleryMarkup } from './create-markup';
// import { showBtn, hideBtn } from './helpers';
// import { PER_PAGE } from './pixabay-api';
// import Notiflix from 'notiflix';
// import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import SimpleLightbox from 'simplelightbox';
// import 'simplelightbox/dist/simple-lightbox.min.css';

// refs.searchForm.addEventListener('submit', handleSearchFormSubmit);

// let page = 0;
// let searchQuery = '';

// let lightbox = new SimpleLightbox('.gallery a', {
//   captionDelay: 250,
//   disableScroll: true,
// });

// let options = {
//   root: null,
//   rootMargin: '300px',
//   threshold: 1.0,
// };

// let observer = new IntersectionObserver(handleLoadMore, options);

// async function handleSearchFormSubmit(event) {
//   event.preventDefault();

//   refs.galleryWrap.innerHTML = '';
//   observer.unobserve(refs.jsGuard);

//   // hideBtn(refs.loadMoreBtn);

//   page = 1;

//   if (!event.target.elements.searchQuery.value.trim()) {
//     Notiflix.Notify.info('Please, insert a search query');
//     return;
//   }

//   searchQuery = event.target.elements.searchQuery.value;

//   try {
//     const response = await fetchSearchQueryData(searchQuery, page);

//     const { hits, total, totalHits } = response.data;

//     if (!hits.length) {
//       Notiflix.Notify.failure(
//         'Sorry, there are no images matching your search query. Please try again.'
//       );
//       return;
//     }

//     Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);

//     refs.galleryWrap.innerHTML = createGalleryMarkup(hits);

//     if (totalHits > PER_PAGE) {
//       observer.observe(refs.jsGuard);
//     }

//     // if (hits.length === PER_PAGE && totalHits > PER_PAGE) {
//     //   showBtn(refs.loadMoreBtn);
//     // }

//     lightbox.refresh();

//     page += 1;
//   } catch (error) {
//     console.log(error);
//     Notiflix.Notify.failure(
//       'Sorry, there are no images matching your search query. Please try again.'
//     );
//   }

//   refs.searchForm.reset();

//   /*=================== Variant 2 - then-catch method ===================*/
//   // fetchSearchQueryData(searchQuery, page)
//   //   .then(({ data }) => {
//   //     console.log(data);
//   //     console.log(page);
//   //     if (!data.hits.length) {
//   //       Notiflix.Notify.failure(
//   //         'Sorry, there are no images matching your search query. Please try again.'
//   //       );
//   //       return;
//   //     }
//   //     console.log(`Hooray! We found ${data.totalHits} images.`);
//   //     Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
//   //     refs.galleryWrap.innerHTML = createGalleryMarkup(data.hits);
//   //     if (data.hits.length === PER_PAGE && data.totalHits > PER_PAGE) {
//   //       showBtn(refs.loadMoreBtn);
//   //     }

//   //     lightbox.refresh();

//   //     page += 1;
//   //   })
//   //   .catch(error => {
//   //     console.log(error);
//   //     Notiflix.Notify.failure(
//   //       'Sorry, there are no images matching your search query. Please try again.'
//   //     );
//   //   });
// }

// function handleLoadMore(entries, observer) {
//   entries.forEach(async entry => {
//     if (entry.isIntersecting) {
//       try {
//         const response = await fetchSearchQueryData(searchQuery, page);
//         const { hits, total, totalHits } = response.data;

//         const galleryMarkUp = createGalleryMarkup(hits);
//         refs.galleryWrap.insertAdjacentHTML('beforeend', galleryMarkUp);

//         lightbox.refresh();

//         page += 1;

//         if (!hits.length) {
//           observer.unobserve(refs.jsGuard);
//           Notiflix.Notify.failure(
//             "We're sorry, but you've reached the end of search results."
//           );
//         }
//       } catch (error) {
//         console.error(error);
//         observer.unobserve(refs.jsGuard);
//         Notiflix.Notify.failure(
//           "We're sorry, but you've reached the end of search results."
//         );
//       }
//     }
//   });
// }
import { refs } from './refs';
import { fetchSearchQueryData } from './pixabay-api';
import { createGalleryMarkup } from './create-markup';
import { showBtn, hideBtn } from './helpers';
import { PER_PAGE } from './pixabay-api';
import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

refs.searchForm.addEventListener('submit', handleSearchFormSubmit);

let page = 0;
let searchQuery = '';

let lightbox = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
  disableScroll: true,
});

let options = {
  root: null,
  rootMargin: '300px',
  threshold: 1.0,
};

let observer = new IntersectionObserver(handleLoadMore, options);

async function handleSearchFormSubmit(event) {
  event.preventDefault();

  refs.galleryWrap.innerHTML = '';
  observer.unobserve(refs.jsGuard);

  // hideBtn(refs.loadMoreBtn);

  page = 1;

  if (!event.target.elements.searchQuery.value.trim()) {
    Notiflix.Notify.info('Please, insert a search query');
    return;
  }

  searchQuery = event.target.elements.searchQuery.value;

  try {
    const response = await fetchSearchQueryData(searchQuery, page);

    const { hits, total, totalHits } = response.data;

    if (!hits.length) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }

    Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);

    refs.galleryWrap.innerHTML = createGalleryMarkup(hits);

    if (totalHits > PER_PAGE) {
      observer.observe(refs.jsGuard);
    }

    // if (hits.length === PER_PAGE && totalHits > PER_PAGE) {
    //   showBtn(refs.loadMoreBtn);
    // }

    lightbox.refresh();

    page += 1;
  } catch (error) {
    console.log(error);
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }

  refs.searchForm.reset();

  /*=================== Variant 2 - then-catch method ===================*/
  // fetchSearchQueryData(searchQuery, page)
  //   .then(({ data }) => {
  //     console.log(data);
  //     console.log(page);
  //     if (!data.hits.length) {
  //       Notiflix.Notify.failure(
  //         'Sorry, there are no images matching your search query. Please try again.'
  //       );
  //       return;
  //     }
  //     console.log(`Hooray! We found ${data.totalHits} images.`);
  //     Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
  //     refs.galleryWrap.innerHTML = createGalleryMarkup(data.hits);
  //     if (data.hits.length === PER_PAGE && data.totalHits > PER_PAGE) {
  //       showBtn(refs.loadMoreBtn);
  //     }

  //     lightbox.refresh();

  //     page += 1;
  //   })
  //   .catch(error => {
  //     console.log(error);
  //     Notiflix.Notify.failure(
  //       'Sorry, there are no images matching your search query. Please try again.'
  //     );
  //   });
}

function handleLoadMore(entries, observer) {
  entries.forEach(async entry => {
    if (entry.isIntersecting) {
      try {
        const response = await fetchSearchQueryData(searchQuery, page);
        const { hits, total, totalHits } = response.data;

        const galleryMarkUp = createGalleryMarkup(hits);
        refs.galleryWrap.insertAdjacentHTML('beforeend', galleryMarkUp);

        lightbox.refresh();

        page += 1;

        if (!hits.length) {
          observer.unobserve(refs.jsGuard);
          Notiflix.Notify.failure(
            "We're sorry, but you've reached the end of search results."
          );
        }
      } catch (error) {
        console.error(error);
        observer.unobserve(refs.jsGuard);
        Notiflix.Notify.failure(
          "We're sorry, but you've reached the end of search results."
        );
      }
    }
  });
}

/*=======================USING LOAD-MORE BUTTON=====================*/

// refs.loadMoreBtn.addEventListener('click', handleLoadMoreBtnClick);
// async function handleLoadMoreBtnClick(event) {
//   hideBtn(refs.loadMoreBtn);

//   try {
//     const response = await fetchSearchQueryData(searchQuery, page);
//     const { hits, total, totalHits } = response.data;

//     const galleryMarkUp = createGalleryMarkup(hits);
//     refs.galleryWrap.insertAdjacentHTML('beforeend', galleryMarkUp);

//     lightbox.refresh();

//     if (hits.length === PER_PAGE && PER_PAGE * page !== totalHits) {
//       showBtn(refs.loadMoreBtn);
//     } else {
//       hideBtn(refs.loadMoreBtn);
//       Notiflix.Notify.failure(
//         "We're sorry, but you've reached the end of search results."
//       );
//     }

//     page += 1;
//   } catch (error) {
//     console.error(error);
//   }

/*=================== Variant 2 - then-catch method ===================*/
// fetchSearchQueryData(searchQuery, page)
//   .then(({ data }) => {
//     console.log(data);
//     console.log(searchQuery);
//     const galleryMarkUp = createGalleryMarkup(data.hits);
//     refs.galleryWrap.insertAdjacentHTML('beforeend', galleryMarkUp);

//     lightbox.refresh();

//     if (data.hits.length === PER_PAGE && PER_PAGE * page !== data.totalHits) {
//       showBtn(refs.loadMoreBtn);
//     } else {
//       hideBtn(refs.loadMoreBtn);
//       Notiflix.Notify.failure(
//         "We're sorry, but you've reached the end of search results."
//       );
//     }

//     page += 1;
//   })
//   .catch(console.error);
// }
