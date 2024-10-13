const fileInput = document.getElementById('file-input');
        const uploadBtn = document.getElementById('upload-btn');
        const previewGrid = document.getElementById('preview-grid');
        const postForm = document.getElementById('post-form');
        const postDescription = document.getElementById('post-description');
        const progressContainer = document.getElementById('progress-container');
        const progress = document.getElementById('progress');

        let files = [];

        uploadBtn.addEventListener('click', () => fileInput.click());

        fileInput.addEventListener('change', (e) => {
            const newFiles = Array.from(e.target.files);
            files = [...files, ...newFiles];
            updatePreview();
        });

        function updatePreview() {
            previewGrid.innerHTML = '';
            files.forEach((file, index) => {
                const previewItem = document.createElement('div');
                previewItem.className = 'preview-item';
                previewItem.style.animationDelay = `${index * 0.1}s`;

                if (file.type.startsWith('image/')) {
                    const img = document.createElement('img');
                    img.src = URL.createObjectURL(file);
                    img.alt = `Preview ${index + 1}`;
                    previewItem.appendChild(img);
                } else if (file.type.startsWith('video/')) {
                    const video = document.createElement('video');
                    video.src = URL.createObjectURL(file);
                    video.controls = true;
                    previewItem.appendChild(video);
                }

                const removeBtn = document.createElement('button');
                removeBtn.className = 'btn btn-remove';
                removeBtn.textContent = 'Remove';
                removeBtn.addEventListener('click', () => {
                    files.splice(index, 1);
                    updatePreview();
                });

                previewItem.appendChild(removeBtn);
                previewGrid.appendChild(previewItem);
            });
        }

        postForm.addEventListener('submit', (e) => {
            e.preventDefault();
            simulateUpload();
        });

        function simulateUpload() {
            progressContainer.style.display = 'block';
            let width = 0;
            const interval = setInterval(() => {
                if (width >= 100) {
                    clearInterval(interval);
                    alert('Post uploaded successfully!');
                    resetForm();
                } else {
                    width += 10;
                    progress.style.width = width + '%';
                }
            }, 200);
        }

        function resetForm() {
            files = [];
            updatePreview();
            postDescription.value = '';
            progressContainer.style.display = 'none';
            progress.style.width = '0%';
        }