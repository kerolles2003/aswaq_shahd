class App {
    constructor() {
        this.state = {
            currentView: 'home',
            currentPage: 0,
            searchQuery: '',
            cart: [] // Future scope
        };
        
        this.init();
    }

    init() {
        this.cacheDOM();
        this.bindEvents();
        this.renderHome();
        this.renderAllProducts(); // For categories/offers views
        this.renderCatalog();
        
        // Simulate Loading
        setTimeout(() => {
            document.getElementById('loader').classList.add('loaded');
        }, 1500);

        // Logo Fallback Text
        document.querySelectorAll('img').forEach(img => {
            img.onerror = function() {
                this.style.display = 'none';
                // Or replace with a colored placeholder
            };
        });
    }

    cacheDOM() {
        this.dom = {
            appContainer: document.getElementById('app-container'),
            views: document.querySelectorAll('.view'),
            navItems: document.querySelectorAll('.nav-item'),
            homeProducts: document.getElementById('home-products'),
            allOffers: document.getElementById('all-offers'),
            allCategories: document.getElementById('all-categories'),
            catalogViewer: document.getElementById('catalog-viewer'),
            searchOverlay: document.getElementById('search-overlay'),
            searchInput: document.getElementById('search-input'),
            searchResults: document.getElementById('search-results'),
            productModal: document.getElementById('product-modal'),
            modalImg: document.getElementById('modal-img'),
            modalTitle: document.getElementById('modal-title'),
            modalDesc: document.getElementById('modal-desc'),
            modalPrice: document.getElementById('modal-new'),
            modalOldPrice: document.getElementById('modal-old'),
            // Gallery
            galleryOverlay: document.getElementById('gallery-overlay'),
            galleryImage: document.getElementById('gallery-image'),
            galleryCounter: document.getElementById('gallery-counter'),
            galleryZoomBtn: document.getElementById('gallery-zoom'),
            galleryViewport: document.getElementById('gallery-viewport')
        };
    }

    bindEvents() {
        // Navigation
        this.dom.navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const target = item.dataset.target;
                this.navigate(target);
            });
        });

        // Search
        document.getElementById('search-toggle').addEventListener('click', () => {
            this.dom.searchOverlay.classList.remove('hidden');
            this.dom.searchInput.focus();
        });

        document.getElementById('close-search').addEventListener('click', () => {
            this.dom.searchOverlay.classList.add('hidden');
        });

        this.dom.searchInput.addEventListener('input', (e) => {
            this.handleSearch(e.target.value);
        });

        // Modal
        document.querySelector('.close-modal').addEventListener('click', () => {
            this.dom.productModal.classList.add('hidden');
        });

        // Outside click modal
        this.dom.productModal.addEventListener('click', (e) => {
            if (e.target === this.dom.productModal) {
                this.dom.productModal.classList.add('hidden');
            }
        });

        // Category Chips
        document.querySelectorAll('.category-chip').forEach(chip => {
            chip.addEventListener('click', () => {
                const cat = chip.dataset.cat;
                this.navigate('categories');
                this.renderCategory(cat);
            });
        });

        // Gallery Events
        document.getElementById('gallery-close').addEventListener('click', () => this.closeGallery());
        document.getElementById('gallery-next').addEventListener('click', () => this.changeGalleryImage(1));
        document.getElementById('gallery-prev').addEventListener('click', () => this.changeGalleryImage(-1));
        
        this.dom.galleryZoomBtn.addEventListener('click', () => {
            this.dom.galleryImage.classList.toggle('zoomed');
            this.dom.galleryViewport.classList.toggle('active-zoom');
            // reset scroll on zoom toggle
            if(this.dom.galleryImage.classList.contains('zoomed')) {
                 this.dom.galleryZoomBtn.innerHTML = '<i class="fa-solid fa-magnifying-glass-minus"></i> تصغير';
            } else {
                 this.dom.galleryZoomBtn.innerHTML = '<i class="fa-solid fa-magnifying-glass-plus"></i> تكبير';
            }
        });

        // Double tap to zoom
        let lastTap = 0;
        this.dom.galleryImage.addEventListener('click', (e) => {
             const currentTime = new Date().getTime();
             const tapLength = currentTime - lastTap;
             if (tapLength < 500 && tapLength > 0) {
                 this.dom.galleryZoomBtn.click();
                 e.preventDefault();
             }
             lastTap = currentTime;
        });

        // Touch Swipe Logic
        let touchstartX = 0;
        let touchendX = 0;
        this.dom.galleryOverlay.addEventListener('touchstart', e => {
            touchstartX = e.changedTouches[0].screenX;
        }, {passive: true});

        this.dom.galleryOverlay.addEventListener('touchend', e => {
            touchendX = e.changedTouches[0].screenX;
            this.handleSwipe();
        }, {passive: true});

        // Reset scroll when closing
        this.galleryIndex = 0;
    }
    
    handleSwipe() {
        if(this.dom.galleryImage.classList.contains('zoomed')) return; // Disable swipe when zoomed to allow panning
        
        if (touchendX < touchstartX - 50) this.changeGalleryImage(-1); // Swipe Left (Next in LTR, but visually we want Next logic)
        if (touchendX > touchstartX + 50) this.changeGalleryImage(1); // Swipe Right
    }

    openGallery(index) {
        this.galleryIndex = index;
        this.updateGalleryUI();
        this.dom.galleryOverlay.classList.remove('hidden');
    }

    closeGallery() {
        this.dom.galleryOverlay.classList.add('hidden');
        this.dom.galleryImage.classList.remove('zoomed');
        this.dom.galleryZoomBtn.innerHTML = '<i class="fa-solid fa-magnifying-glass-plus"></i> تكبير';
    }

    changeGalleryImage(direction) {
        // RTL Direction Logic: 
        // Prev button (Right Arrow) -> Should go to previous index (decrements)
        // Next button (Left Arrow) -> Should go to next index (increments)
        // Wait, standard array walking: 0, 1, 2. 
        // Start: 0. Next -> 1.
        // In Arabic/RTL: Page 1 is on the Right. Page 2 is to its Left.
        // So clicking "Left" (Next Icon) should Go to Index + 1.
        // Clicking "Right" (Prev Icon) should Go to Index - 1.
        
        let newIndex = this.galleryIndex + direction;
        
        if (newIndex < 0) newIndex = catalogPages.length - 1;
        if (newIndex >= catalogPages.length) newIndex = 0;
        
        this.galleryIndex = newIndex;
        this.updateGalleryUI();
    }

    updateGalleryUI() {
        const src = catalogPages[this.galleryIndex];
        this.dom.galleryImage.src = src;
        this.dom.galleryCounter.textContent = `${this.galleryIndex + 1} / ${catalogPages.length}`;
        
        // Reset zoom on slide change
        this.dom.galleryImage.classList.remove('zoomed');
        this.dom.galleryZoomBtn.innerHTML = '<i class="fa-solid fa-magnifying-glass-plus"></i> تكبير';
        this.dom.galleryViewport.scrollTo(0,0);
    }

    navigate(viewName) {
        // Update State
        this.state.currentView = viewName;


        // Update UI
        this.dom.views.forEach(view => {
            view.classList.add('hidden');
            if(view.id === `${viewName}-view`) {
                view.classList.remove('hidden');
            }
        });

        // Update Bottom Nav
        this.dom.navItems.forEach(item => {
            item.classList.remove('active');
            if(item.dataset.target === viewName) {
                item.classList.add('active');
            }
        });

        window.scrollTo(0, 0);
    }

    createProductCard(product) {
        const div = document.createElement('div');
        div.className = 'product-card';
        div.onclick = () => this.openProduct(product);

        const discountBadge = product.offer 
            ? `<div class="discount-badge">خصم ${(100 - (product.price/product.oldPrice)*100).toFixed(0)}%</div>` 
            : '';

        div.innerHTML = `
            ${discountBadge}
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" onerror="this.src='https://dummyimage.com/300x300/e6e6e6/7f8c8d.png&text=No+Image'">
            </div>
            <div class="product-info">
                <h4 class="product-title">${product.name}</h4>
                <div class="product-price">
                    <span class="currency">ج.م</span>
                    <span class="current-price">${product.price.toFixed(2)}</span>
                    ${product.oldPrice ? `<span class="old-price">${product.oldPrice.toFixed(2)}</span>` : ''}
                </div>
            </div>
        `;
        return div;
    }

    renderHome() {
        const featured = products.filter(p => p.offer).slice(0, 6);
        this.dom.homeProducts.innerHTML = '';
        featured.forEach(p => {
            this.dom.homeProducts.appendChild(this.createProductCard(p));
        });

        // Set Cover
        document.getElementById('header-logo').src = 'assets/img/logo.png';
        document.getElementById('header-logo').onerror = function(){ this.style.display='none'; }
        document.getElementById('hero-cover').src = catalogPages[0];
        document.getElementById('hero-cover').onerror = function(){ this.src='https://dummyimage.com/600x800/2ecc71/ffffff.png&text=Magazine+Cover'; }
        
        // Add Date Banner
        const heroActions = document.querySelector('.hero-actions');
        if(!document.getElementById('magazine-date')) {
            const dateDiv = document.createElement('div');
            dateDiv.id = 'magazine-date';
            dateDiv.className = 'glass-effect';
            dateDiv.style.margin = '10px auto';
            dateDiv.style.padding = '8px 15px';
            dateDiv.style.borderRadius = '20px';
            dateDiv.style.display = 'inline-block';
            dateDiv.style.color = 'var(--primary-dark)';
            dateDiv.style.fontWeight = 'bold';
            dateDiv.style.fontSize = '0.9rem';
            dateDiv.innerHTML = '<i class="fa-regular fa-calendar"></i> ساري من 25/02/2025';
            
            heroActions.parentNode.insertBefore(dateDiv, heroActions);
        }
    }

    renderAllProducts() {
        // Offers View
        const offers = products.filter(p => p.offer);
        this.dom.allOffers.className = 'products-grid'; // Ensure grid style
        this.dom.allOffers.innerHTML = '';
        offers.forEach(p => {
            this.dom.allOffers.appendChild(this.createProductCard(p));
        });

        // Categories View (Initially show all or grouping)
        // Simple grouping for now
        this.renderCategory('all');
    }

    renderCategory(filterCat) {
        const container = this.dom.allCategories;
        container.innerHTML = ''; // Clear
        container.className = 'products-grid';

        const filtered = filterCat === 'all' ? products : products.filter(p => p.category === filterCat);
        
        if (filtered.length === 0) {
            container.innerHTML = '<p>لا توجد منتجات في هذا القسم</p>';
            return;
        }

        filtered.forEach(p => {
            container.appendChild(this.createProductCard(p));
        });
    }

    renderCatalog() {
        this.dom.catalogViewer.innerHTML = '';
        catalogPages.forEach((pageSrc, index) => {
            const img = document.createElement('img');
            img.src = pageSrc;
            img.className = 'catalog-page';
            img.loading = 'lazy';
            img.onerror = function() {
                this.src = `https://dummyimage.com/600x850/fff/000.png&text=Page+${index+1}`;
            };
            // Add click to open gallery
            img.onclick = () => this.openGallery(index);
            img.style.cursor = 'pointer';
            
            this.dom.catalogViewer.appendChild(img);
        });
        document.getElementById('total-pages').textContent = catalogPages.length;
    }

    handleSearch(query) {
        const results = document.getElementById('search-results');
        results.innerHTML = '';
        
        if (!query) return;

        const matches = products.filter(p => p.name.includes(query) || p.desc.includes(query));
        
        if (matches.length === 0) {
            results.innerHTML = '<div class="no-results">لا توجد نتائج</div>';
            return;
        }

        matches.forEach(p => {
            const div = document.createElement('div');
            div.className = 'search-item';
            div.style.padding = '10px';
            div.style.borderBottom = '1px solid #eee';
            div.style.display = 'flex';
            div.style.gap = '10px';
            div.style.alignItems = 'center';
            div.style.cursor = 'pointer';
            
            div.innerHTML = `
                <img src="${p.image}" style="width: 50px; height: 50px; object-fit: contain;">
                <div>
                    <div style="font-weight: bold;">${p.name}</div>
                    <div style="color: var(--primary-color);">${p.price} ر.س</div>
                </div>
            `;
            div.onclick = () => {
                this.openProduct(p);
                this.dom.searchOverlay.classList.add('hidden');
            };
            results.appendChild(div);
        });
    }

    openProduct(product) {
        this.dom.modalImg.src = product.image;
        this.dom.modalImg.onerror = function(){ this.src='https://dummyimage.com/300x300/e6e6e6/7f8c8d.png&text=No+Image'; }
        
        this.dom.modalTitle.textContent = product.name;
        this.dom.modalDesc.textContent = product.desc;
        this.dom.modalPrice.textContent = product.price.toFixed(2);
        
        if (product.oldPrice) {
            this.dom.modalOldPrice.textContent = product.oldPrice.toFixed(2);
            this.dom.modalOldPrice.classList.remove('hidden');
        } else {
            this.dom.modalOldPrice.classList.add('hidden');
        }

        this.dom.productModal.classList.remove('hidden');
    }
}

// Global Router Helper
const router = {
    navigate: (target) => app.navigate(target)
};

// Initialize
const app = new App();
