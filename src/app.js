document.addEventListener("alpine:init", () => {
  Alpine.data("products", () => ({
    items: [
      { id: 1, name: "Ramen Seasoning", img: "bumbu.jpg", price: 100000 },
      { id: 2, name: "Seacret Sauce", img: "saos.jpg", price: 100000 },
      { id: 3, name: "Ramen Noodles", img: "mie.jpg", price: 50000 },
      { id: 4, name: "Bags of Green Tea", img: "teh.jpg", price: 50000 },
      { id: 5, name: "Cookies", img: "kue.jpg", price: 20000 },
      { id: 6, name: "Boild Eggs", img: "telur.jpg", price: 7000 },
    ],
  }));
  Alpine.store("cart", {
    items: [],
    total: 0,
    quantity: 0,
    add(newItem) {
      // cek ada barang yang sama gak
      const cartItem = this.items.find((item) => item.id === newItem.id);
      // kalau belum ada barang
      if (!cartItem) {
        this.items.push({ ...newItem, quantity: 1, total: newItem.price });
        this.quantity++;
        this.total += newItem.price;
      } else {
        // barang sudah ada
        this.items = this.items.map((item) => {
          if (item.id !== newItem.id) {
            return item;
          } else {
            // jika barang sudah ada
            item.quantity++;
            item.total = item.price * item.quantity;
            this.quantity++;
            this.total += item.price;
            return item;
          }
        });
      }
      console.log(this.total);
    },

    remove(id) {
      const cartItem = this.items.find((item) => item.id === id);

      if (cartItem.quantity > 1) {
        this.items = this.items.map((item) => {
          if (item.id !== id) {
            return item;
          } else {
            item.quantity--;
            item.total = item.price * item.quantity;
            this.quantity--;
            thisa.total -= item.price;
            return item;
          }
        });
      } else if (cartItem.quantity === 1) {
        this.items = this.items.filter((item) => item.id !== id);
        this.quantity--;
        this.total -= cartItem.price;
      }
    },
  });
});

// konversi ke rupiah
const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};
