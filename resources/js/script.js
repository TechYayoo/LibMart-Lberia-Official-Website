/*** Script Resources **/

 // ---------- Icon library (per category, flat line icons) ----------
  const icons = {
    clothing: `<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.6"><path d="M9 3 4 6.5 6.5 9.5 8 8.5V21h8V8.5l1.5 1 2.5-3L15 3l-1.5 2h-3L9 3Z" stroke-linejoin="round"/></svg>`,
    electronics: `<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.6"><rect x="3" y="4" width="18" height="12" rx="1.5"/><path d="M8 20h8M12 16v4"/></svg>`,
    phones: `<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.6"><rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/></svg>`,
    boots: `<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.6"><path d="M9 3v6l-4 3.5V18a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2c0-2-2-2.6-4-3.5L13 12V3Z" stroke-linejoin="round"/></svg>`,
    accessories: `<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.6"><rect x="4" y="9" width="16" height="10" rx="2"/><path d="M8 9V6a4 4 0 0 1 8 0v3"/></svg>`
  };
  const catColor = {
    clothing:"#378ADD", electronics:"#1D9E75", phones:"#D85A30", boots:"#F2A93B", accessories:"#7F77DD"
  };
  const catLabel = {
    clothing:"Clothing", electronics:"Electronics", phones:"Phones", boots:"Boots", accessories:"Accessories"
  };

  // ---------- Product data ----------
  const products = [
    {id:1, name:"Leather men's suit", cat:"clothing", price:4550},
    {id:2, name:"Ladies' suit", cat:"clothing", price:5000},
    {id:3, name:"Ladies' outfit", cat:"clothing", price:5000},
    {id:4, name:"Men's Cotton T-shirts", cat:"clothing", price:1800},
    {id:5, name:"Smart TV, 50-inch", cat:"electronics", price:69160},
    {id:6, name:"Wireless earbug", cat:"electronics", price:2500},
    {id:7, name:"Portable speaker", cat:"electronics", price:3500},
    {id:8, name:"Ring light", cat:"electronics", price:4000},
    {id:9, name:"Iphone 17pro max + 256GB", cat:"phones", price:283900},
    {id:10, name:"Kids' tablets ", cat:"phones", price:21840},
    {id:11, name:"Phone case + screen guard", cat:"phones", price:900},
    {id:12, name:"Men's sneakers all sizes", cat:"boots", price:4000},
    {id:13, name:"Ladies' ankle boots", cat:"boots", price:6700},
    {id:14, name:"Ladies' ankle boots", cat:"boots", price:8000},
    {id:15, name:"Leather belt", cat:"accessories", price:2050},
    {id:16, name:"Wrist watch", cat:"accessories", price:2000},
    {id:17, name:"Kids' outfit", cat:"clothing", price:2000},
    {id:18, name:"Kids' sweater", cat:"clothing", price:1700},
    {id:19, name:"Wireless earbug", cat:"electronics", price:2050},
    {id:20, name:"Wireless bluetooth speaker", cat:"electronics", price:5600},
    {id:21, name:"Iphone 17pro max +236GB", cat:"phones", price:283900},
    {id:22, name:"Men's boot", cat:"boots", price:7200},
    {id:23, name:"Ladies' boot", cat:"boots", price:6350},
    {id:24, name:"Sunglasses", cat:"accessories", price:1500},
    {id:25, name:"Wrist watch", cat: "accessories", price:1500},
    {id:26, name:"Wrist watch", cat: "accessories", price:1500},
    {id:27, name:"Wrist watch", cat: "accessories", price:1500},
    {id:28, name:"Wrist watch", cat: "accessories", price:1500},
    {id:29, name:"Wrist watch", cat: "accessories", price:2000},
    {id:30, name:"Wrist watch", cat: "accessories", price:1800},
    {id:31, name:"Wrist watch", cat: "accessories", price:1500},
    {id:32, name:"Wrist watch", cat: "accessories", price:1500},
    {id:33, name:"Men's suit", cat:"clothing", price:3250},
    {id:34, name:"Men's T-shirt", cat:"clothing", price:1800},
    {id:35, name:"Phone case", cat:"phones", price:850},
    {id:36, name:"Wireless earbug", cat:"electronics", price:2200},
    {id:37, name:"Wireless bluetooth speaker", cat:"electronics", price:8700},
    {id:38, name:"Bluetooth speaker + all essenstials", cat:"electronics", price:12500},
    {id:39, name:"Ring light", cat:"electronics", price:4550},
    {id:40, name:"Playstation 5 PS5 slim ultra HD", cat:"electronics", price:100100},
    {id:41, name:"Wireless earbug", cat:"electronics", price:2550},
    
  ];

  let activeCat = "all";
  let cart = {}; // id -> qty

  // Approximate mid-market rate (LRD per 1 USD) — update periodically as rates shift
  const EXCHANGE_RATE = 182;
  function fmt(n){ return "LRD " + n.toLocaleString(); }
  function fmtUsd(n){ return "$" + (n / EXCHANGE_RATE).toFixed(2); }

  function escapeHtml(str){
    const div = document.createElement("div");
    div.textContent = String(str);
    return div.innerHTML;
  }

  function renderGrid(){
    const grid = document.getElementById("productGrid");
    const q = document.getElementById("searchInput").value.trim().toLowerCase();
    grid.innerHTML = "";
    let shown = 0;
    products.forEach(p => {
      const matchesCat = activeCat === "all" || p.cat === activeCat;
      const matchesSearch = p.name.toLowerCase().includes(q);
      if(!matchesCat || !matchesSearch) return;
      shown++;
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <div class="card-media"><img src="images/product-${p.id}.jpg" alt="${escapeHtml(p.name)}" loading="lazy"></div>
        <div class="card-tag">${escapeHtml(catLabel[p.cat])}</div>
        <p class="card-name">${escapeHtml(p.name)}</p>
        <div class="card-row">
          <span class="price-block">
            <span class="price mono">${fmt(p.price)}</span>
            <span class="price-usd mono">${fmtUsd(p.price)}</span>
          </span>
          <button class="add-btn" onclick="addToCart(${p.id})">Add to cart</button>
        </div>
      `;
      grid.appendChild(card);
    });
    document.getElementById("resultCount").textContent = shown + (shown === 1 ? " item" : " items");
  }

  document.querySelectorAll(".chip").forEach(chip => {
    chip.addEventListener("click", () => {
      document.querySelectorAll(".chip").forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      activeCat = chip.dataset.cat;
      renderGrid();
    });
  });
  document.getElementById("searchInput").addEventListener("input", renderGrid);

  function addToCart(id){
    cart[id] = (cart[id] || 0) + 1;
    updateCartUI();
    openCart();
  }
  function changeQty(id, delta){
    if(!cart[id]) return;
    cart[id] += delta;
    if(cart[id] <= 0) delete cart[id];
    updateCartUI();
  }
  function removeItem(id){
    delete cart[id];
    updateCartUI();
  }

  function updateCartUI(){
    const count = Object.values(cart).reduce((a,b)=>a+b,0);
    document.getElementById("cartBadge").textContent = count;
    const itemsEl = document.getElementById("drawerItems");
    const ids = Object.keys(cart);
    if(ids.length === 0){
      itemsEl.innerHTML = `<div class="drawer-empty">Your cart is empty.<br>Add something from the shop.</div>`;
    } else {
      itemsEl.innerHTML = ids.map(id => {
        const p = products.find(x => x.id == id);
        const qty = cart[id];
        return `
          <div class="cart-item">
            <div class="thumb"><img src="images/product-${p.id}.jpg" alt="${escapeHtml(p.name)}"></div>
            <div class="info">
              <p class="name">${escapeHtml(p.name)}</p>
              <span class="unit mono">${fmt(p.price)} · ${fmtUsd(p.price)}</span>
              <div class="qty-row">
                <button class="qty-btn" onclick="changeQty(${p.id},-1)">−</button>
                <span class="qty-num">${qty}</span>
                <button class="qty-btn" onclick="changeQty(${p.id},1)">+</button>
                <button class="remove-btn" onclick="removeItem(${p.id})">Remove</button>
              </div>
            </div>
          </div>
        `;
      }).join("");
    }
    const subtotal = ids.reduce((sum, id) => sum + products.find(x=>x.id==id).price * cart[id], 0);
    document.getElementById("subtotal").textContent = fmt(subtotal);
    document.getElementById("subtotalUsd").textContent = fmtUsd(subtotal);
  }

  function openCart(){
    document.getElementById("drawer").classList.add("open");
    document.getElementById("overlay").classList.add("open");
  }
  function closeCart(){
    document.getElementById("drawer").classList.remove("open");
    document.getElementById("overlay").classList.remove("open");
  }

  function checkoutWhatsApp(){
    const ids = Object.keys(cart);
    if(ids.length === 0) return;
    let lines = ["Hi LibMart! I'd like to order:"];
    let total = 0;
    ids.forEach(id => {
      const p = products.find(x => x.id == id);
      const qty = cart[id];
      total += p.price * qty;
      lines.push(`- ${qty}x ${p.name} (${fmt(p.price)} / ${fmtUsd(p.price)} each)`);
    });
    lines.push(`Total: ${fmt(total)} (${fmtUsd(total)})`);
    lines.push("");
    lines.push("Name: ");
    lines.push("Delivery location: ");
    const message = encodeURIComponent(lines.join("\n"));
    // Replace 231XXXXXXXXX with your actual WhatsApp business number (country code + number, no + or leading 0)
    const win = window.open(`https://wa.me/231555798912?text=${message}`, "_blank", "noopener,noreferrer");
    if (win) win.opener = null;
  }

  renderGrid();
  updateCartUI();

