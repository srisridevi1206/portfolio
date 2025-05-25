document.addEventListener('DOMContentLoaded', function() {
    const book = document.querySelector('.book');
    const cover = document.querySelector('.book-cover');
    const pages = document.querySelectorAll('.page');
    let currentPage = -1;
    
    function initializePages() {
        pages.forEach((page, index) => {
            page.style.zIndex = 10 - index;
            page.addEventListener('click', (e) => {
                // Determine click position for left/right navigation
                const clickX = e.offsetX;
                const pageWidth = page.offsetWidth;
                
                if (clickX < pageWidth / 2) {
                    turnPageBack();
                } else {
                    turnPageForward(index);
                }
            });
        });
    }

    function turnPageForward(pageIndex) {
        if (currentPage === -1) {
            // Opening the cover
            cover.classList.add('turned');
            currentPage = 0;
        } else if (pageIndex === currentPage && currentPage < pages.length) {
            // Turn to next page
            pages[currentPage].classList.add('turned');
            currentPage++;
            
            // Reset book if we reach the last page
            if (currentPage >= pages.length) {
                setTimeout(() => {
                    resetBook();
                }, 1000); // Wait for the last page turn animation to complete
            }
        }

        updateNavigationHints();
    }

    function turnPageBack() {
        if (currentPage > 0) {
            pages[currentPage - 1].classList.remove('turned');
            currentPage--;
        } else if (currentPage === 0) {
            cover.classList.remove('turned');
            currentPage = -1;
        }

        updateNavigationHints();
    }

    function updateNavigationHints() {
        pages.forEach((page, index) => {
            page.classList.toggle('can-go-back', index < currentPage);
            page.classList.toggle('can-go-forward', index === currentPage);
        });
    }

    function resetBook() {
        // Animate the reset with sequential timing
        const totalPages = pages.length;
        
        // Reset pages in reverse order
        for(let i = totalPages - 1; i >= 0; i--) {
            setTimeout(() => {
                pages[i].classList.remove('turned');
            }, (totalPages - i) * 200);
        }
        
        // Reset cover last
        setTimeout(() => {
            cover.classList.remove('turned');
            currentPage = -1;
            updateNavigationHints();
        }, (totalPages + 1) * 200);
    }

    cover.addEventListener('click', (e) => {
        const clickX = e.offsetX;
        const coverWidth = cover.offsetWidth;
        
        if (clickX < coverWidth / 2 && currentPage !== -1) {
            turnPageBack();
        } else {
            turnPageForward(currentPage);
        }
    });

    initializePages();

    // Touch events for mobile
    let startX;
    let isDragging = false;

    book.addEventListener('touchstart', e => {
        startX = e.touches[0].clientX;
        isDragging = true;
    });

    book.addEventListener('touchmove', e => {
        if (!isDragging) return;
        e.preventDefault();
    });

    book.addEventListener('touchend', e => {
        if (!isDragging) return;
        
        const endX = e.changedTouches[0].clientX;
        const diff = startX - endX;
        
        if (Math.abs(diff) > 50) {
            if (diff > 0) { // Swipe left
                turnPageForward(currentPage);
            } else { // Swipe right
                turnPageBack();
            }
        }
        
        isDragging = false;
    });
});
