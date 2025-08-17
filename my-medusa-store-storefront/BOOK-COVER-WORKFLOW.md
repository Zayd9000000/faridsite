# Book Cover Image Workflow

## Current Book Titles to Update

1. **The Divine Comedy** - Dante Alighieri
2. **War and Peace** - Leo Tolstoy  
3. **Ulysses** - James Joyce
4. **Don Quixote** - Miguel de Cervantes
5. **Moby Dick** - Herman Melville
6. **Pride and Prejudice** - Jane Austen

## Workflow for Finding Book Covers

### Option 1: Open Library Covers API (Free, No API Key)
- URL Pattern: `https://covers.openlibrary.org/b/isbn/{ISBN}-L.jpg`
- Alternative: `https://covers.openlibrary.org/b/olid/{OLID}-L.jpg`
- Example: https://covers.openlibrary.org/b/isbn/9780141197685-L.jpg (Ulysses Penguin)

### Option 2: Google Books API
- Search by title: `https://www.googleapis.com/books/v1/volumes?q={title}+{author}`
- Extract `imageLinks.thumbnail` from response
- Higher quality available with `zoom=1` parameter

### Option 3: Direct Publisher/Retailer Images
- Penguin Random House
- HarperCollins
- Amazon product images (stable URLs)

## Implementation Steps

1. Find ISBN or edition-specific identifiers for each book
2. Use Open Library or Google Books API to get cover URLs
3. Download and host images locally or use CDN URLs
4. Update the product data with actual cover URLs

## Book Cover URLs Found

### Classic Editions (High Quality)

1. **The Divine Comedy** - Dante Alighieri
   - ISBN: 9780142437223 (Penguin Classics)
   - Cover: https://covers.openlibrary.org/b/isbn/9780142437223-L.jpg

2. **War and Peace** - Leo Tolstoy
   - ISBN: 9780143035008 (Penguin Classics) 
   - Cover: https://covers.openlibrary.org/b/isbn/9780143035008-L.jpg

3. **Ulysses** - James Joyce
   - ISBN: 9780141182803 (Penguin Modern Classics)
   - Cover: https://covers.openlibrary.org/b/isbn/9780141182803-L.jpg

4. **Don Quixote** - Miguel de Cervantes
   - ISBN: 9780142437230 (Penguin Classics)
   - Cover: https://covers.openlibrary.org/b/isbn/9780142437230-L.jpg

5. **Moby Dick** - Herman Melville
   - ISBN: 9780142437247 (Penguin Classics)
   - Cover: https://covers.openlibrary.org/b/isbn/9780142437247-L.jpg

6. **Pride and Prejudice** - Jane Austen
   - ISBN: 9780141439518 (Penguin Classics)
   - Cover: https://covers.openlibrary.org/b/isbn/9780141439518-L.jpg