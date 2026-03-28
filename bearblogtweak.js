// Format month/year
function formatMonthYear(date) {
    return date.toLocaleString('default', { month: 'long', year: 'numeric' });
}

function organizeBlogPosts() {
    const blogPostsList = document.querySelector('.blog-posts');
    if (!blogPostsList) return;

    const posts = Array.from(blogPostsList.querySelectorAll('li'));

    const postsByMonth = new Map();

    posts.forEach(post => {
        const timeElement = post.querySelector('time');
        if (!timeElement) return;

        const date = new Date(timeElement.getAttribute('datetime'));
        const monthYear = formatMonthYear(date);

        if (!postsByMonth.has(monthYear)) {
            postsByMonth.set(monthYear, []);
        }
        postsByMonth.get(monthYear).push(post);
    });

    blogPostsList.innerHTML = '';

    const sortedMonths = Array.from(postsByMonth.keys()).sort((a, b) => {
        return new Date(b) - new Date(a);
    });

    sortedMonths.forEach((monthYear, index) => {

        // wrapper
        const section = document.createElement('div');
        section.className = 'month-group';

        // header
        const header = document.createElement('h2');
        header.className = 'month-header';
        header.style.cursor = 'pointer';

        // arrow span
        const arrow = document.createElement('span');
        arrow.className = 'month-arrow';
        arrow.textContent = index === 0 ? '▾ ' : '▸ ';

        // text node
        const text = document.createTextNode(monthYear);

        header.appendChild(arrow);
        header.appendChild(text);

        // content container
        const content = document.createElement('div');
        content.className = 'month-content';

        // default: newest open
        content.style.display = index === 0 ? 'block' : 'none';

        // toggle behavior
        header.addEventListener('click', () => {
            const isOpen = content.style.display === 'block';

            content.style.display = isOpen ? 'none' : 'block';
            arrow.textContent = isOpen ? '▸ ' : '▾ ';
        });

        // append posts
        postsByMonth.get(monthYear).forEach(post => {
            content.appendChild(post);
        });

        section.appendChild(header);
        section.appendChild(content);
        blogPostsList.appendChild(section);
    });
}

// run only on blog page
if (document.querySelector(".blog-posts") && document.body.classList.contains("blog")) {
    document.addEventListener('DOMContentLoaded', organizeBlogPosts);
}
