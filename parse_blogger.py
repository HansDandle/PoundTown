import xml.etree.ElementTree as ET
import json
import html
import re
from datetime import datetime

# Parse the Blogger feed.atom file
tree = ET.parse(r'c:\Users\brixw\Downloads\takeout-20251107T060623Z-1-001\Takeout\Blogger\Blogs\Pound Town, Texas\feed.atom')
root = tree.getroot()

# Define namespaces
namespaces = {
    'atom': 'http://www.w3.org/2005/Atom',
    'blogger': 'http://schemas.google.com/blogger/2018'
}

# Extract all entries
entries = []
for entry in root.findall('atom:entry', namespaces):
    # Get status
    status_elem = entry.find('blogger:status', namespaces)
    status = status_elem.text if status_elem is not None else None
    
    # Only process LIVE entries
    if status != 'LIVE':
        continue
    
    # Get type (POST or PAGE)
    type_elem = entry.find('blogger:type', namespaces)
    entry_type = type_elem.text if type_elem is not None else None
    
    # Get title
    title_elem = entry.find('atom:title', namespaces)
    title = title_elem.text if title_elem is not None else 'Untitled'
    
    # Get content
    content_elem = entry.find('atom:content', namespaces)
    content_html = content_elem.text if content_elem is not None else ''
    
    # Get published date
    published_elem = entry.find('atom:published', namespaces)
    published = published_elem.text if published_elem is not None else ''
    
    # Get updated date
    updated_elem = entry.find('atom:updated', namespaces)
    updated = updated_elem.text if updated_elem is not None else ''
    
    # Get filename
    filename_elem = entry.find('blogger:filename', namespaces)
    filename = filename_elem.text if filename_elem is not None else ''
    
    # Extract slug from filename
    slug = ''
    if filename:
        # Extract the last part of the path (e.g., "baby-on-board-sticker.html")
        slug = filename.split('/')[-1].replace('.html', '')
    
    # Get author
    author_elem = entry.find('atom:author/atom:name', namespaces)
    author = author_elem.text if author_elem is not None else 'Unknown'
    
    # Create entry object
    entry_data = {
        'title': title,
        'slug': slug,
        'type': entry_type,
        'content': content_html,
        'published': published,
        'updated': updated,
        'author': author,
        'filename': filename
    }
    
    entries.append(entry_data)

# Separate posts and pages
posts = [e for e in entries if e['type'] == 'POST']
pages = [e for e in entries if e['type'] == 'PAGE']

# Sort posts by published date (newest first)
posts.sort(key=lambda x: x['published'], reverse=True)

# Save to JSON file
output = {
    'blog_title': 'Pound Town, Texas',
    'posts': posts,
    'pages': pages,
    'total_posts': len(posts),
    'total_pages': len(pages)
}

with open('blogger_content.json', 'w', encoding='utf-8') as f:
    json.dump(output, f, indent=2, ensure_ascii=False)

print(f"Extracted {len(posts)} posts and {len(pages)} pages")
print(f"\nPosts:")
for post in posts:
    print(f"  - {post['title']} ({post['slug']})")
print(f"\nPages:")
for page in pages:
    print(f"  - {page['title']} ({page['slug']})")
