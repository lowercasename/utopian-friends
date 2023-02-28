// A function to parse Editor.js JSON data and return HTML
export const parseEditorJS = (data: string) => {
    const json = JSON.parse(data);
    let html = '';
    json.blocks.forEach((block: any) => {
        switch (block.type) {
            case 'paragraph':
                html += `<p>${block.data.text}</p>`;
                break;
            case 'header':
                html += `<h${block.data.level}>${block.data.text}</h${block.data.level}>`;
                break;
            case 'list':
                html += `<${block.data.style === 'ordered' ? 'ol' : 'ul'}>`;
                block.data.items.forEach((item: string) => {
                    html += `<li>${item}</li>`;
                });
                html += `</${block.data.style === 'ordered' ? 'ol' : 'ul'}>`;
                break;
            case 'image':
                html += `<img src="${block.data.file.url}" alt="${block.data.caption}">`;
                break;
            case 'embed':
                html += block.data.embed;
                break;
            case 'delimiter':
                html += `<hr>`;
                break;
            case 'table':
                html += `<table>`;
                block.data.content.forEach((row: string[]) => {
                    html += `<tr>`;
                    row.forEach((cell: string) => {
                        html += `<td>${cell}</td>`;
                    });
                    html += `</tr>`;
                });
                html += `</table>`;
                break;
            case 'quote':
                html += `<blockquote>${block.data.text}</blockquote>`;
                break;
            case 'warning':
                html += `<div class="warning"><h4>${block.data.title}</h4><p>${block.data.message}</p></div>`;
                break;
            case 'code':
                html += `<pre><code>${block.data.code}</code></pre>`;
                break;
            case 'linkTool':
                html += `<a href="${block.data.link}">${block.data.meta.title}</a>`;
                break;
            case 'raw':
                html += block.data.html;
                break;
            default:
                console.error(`Unknown block type: ${block.type}`);
                break;
        }
    });
    return html;
}