/**
 * Utility functions for printing the profile page
 */

export function printProfile() {
  // Create a new window for printing
  const printWindow = window.open('', '_blank');
  
  if (!printWindow) {
    alert('Please allow popups for this website');
    return;
  }
  
  // Get the current profile content
  const profileContent = document.querySelector('.max-w-3xl');
  
  if (!profileContent) {
    printWindow.close();
    return;
  }
  
  // Create a simplified version for printing
  const printContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>CV Profile</title>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <style>
        body {
          font-family: system-ui, -apple-system, sans-serif;
          line-height: 1.5;
          padding: 2rem;
          max-width: 800px;
          margin: 0 auto;
          color: #333;
        }
        h1 { font-size: 1.5rem; margin-bottom: 0.5rem; }
        h2 { font-size: 1.25rem; margin-top: 1.5rem; margin-bottom: 0.75rem; }
        p { margin-bottom: 0.75rem; }
        .header { display: flex; align-items: center; margin-bottom: 2rem; }
        .header-content { margin-left: 1rem; }
        .avatar { width: 80px; height: 80px; border-radius: 50%; object-fit: cover; }
        .status { padding: 1rem; background-color: #f5f5f5; border-radius: 0.5rem; margin-bottom: 1.5rem; }
        .project { margin-bottom: 2rem; padding-bottom: 1rem; border-bottom: 1px solid #eee; }
        .project h3 { margin-bottom: 0.5rem; }
        .tags { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 0.75rem; }
        .tag { background-color: #f0f0f0; padding: 0.25rem 0.5rem; border-radius: 0.25rem; font-size: 0.75rem; }
        .links { display: flex; gap: 1rem; margin-top: 0.75rem; }
        .link { color: #0066cc; text-decoration: none; }
        @media print {
          body { padding: 0; }
          .no-print { display: none; }
        }
      </style>
    </head>
    <body>
      ${profileContent.innerHTML}
      <div class="no-print" style="margin-top: 2rem; text-align: center;">
        <button onclick="window.print(); setTimeout(() => window.close(), 500);">Print</button>
      </div>
      <script>
        // Clean up the content for printing
        document.querySelectorAll('.fixed, button').forEach(el => {
          if (!el.classList.contains('no-print')) {
            el.remove();
          }
        });
      </script>
    </body>
    </html>
  `;
  
  // Write the content to the new window
  printWindow.document.open();
  printWindow.document.write(printContent);
  printWindow.document.close();
}