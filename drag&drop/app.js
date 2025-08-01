let previousContainer = null;



let numbers = {
    one: 1,
     two: 2, 
     tree: 1, 
     four: 1,
      five: 1
}





function applyDragEvents(item) {
    item.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', e.target.id);
        previousContainer = item.parentElement;
        item.classList.add('dragging');
    });

    item.addEventListener('dragend', () => {
        item.classList.remove('dragging');
    });
}

document.querySelectorAll('.item').forEach(applyDragEvents);

document.querySelectorAll('.dropzone').forEach((zone) => {
    zone.addEventListener('dragover', (e) => {
        e.preventDefault();
        zone.style.backgroundColor = '#e0ffe0';
    });

    zone.addEventListener('dragleave', () => {
        zone.style.backgroundColor = '';
    });

    zone.addEventListener('drop', (e) => {
        e.preventDefault();
        zone.style.backgroundColor = '';

        const itemId = e.dataTransfer.getData('text/plain');
        const draggedItem = document.getElementById(itemId);
        const itemType = draggedItem.dataset.type;

        const isSource = zone.id === 'source';

        if (!isSource) {
            const sameTypeCount = [...zone.children].filter(
                (child) => child.dataset.type === itemType
            ).length;

            const maxAllowed = numbers[itemType] ?? 1;

            if (sameTypeCount >= maxAllowed) {
                alert(`هر ستون فقط می‌تونه ${maxAllowed} تا آیتم «${itemType}» داشته باشه.`);
                previousContainer.appendChild(draggedItem);
                return;
            }
        }

        zone.appendChild(draggedItem);
    });
});
