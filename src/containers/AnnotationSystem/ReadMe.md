# Read me • Annotation system

What left

- [ ] Auto adjust SVG viewport to media (image or video) size
- [ ] Auto adjust media (image or video) to user's screen size. Do only once at initial run
- [ ] Create annotator component - one that initialize box with h, w, x, y, label, time,..
- [ ] Set label of annotation box
  - [ ] Show in SVG foreign object
  - [ ] Position not go outside current viewport
  - [ ] Show label if only small part of annotation box is visible (during high zoom level & main viewport move)
- [ ] Toolbar
  - SVG viewport
    - Zoom
      - In
      - Out
      - 1:1
    - Movement
  - Create annotation object
  - If annotation object selected
    - Label change (?)
    - Delete
- Sidebar with all annotation labels and their options
  - If video annotation
    - All points at timeline where movement was done
  
      ```
      "Label 1": [
        {
          time: 123.12345
          x: 123,
          y: 444,
          w: 400,
          h: 123
        },
        {
          time: 234.12345
          x: 234,
          y: 800,
          w: 500,
          h: 300
        }
      ]
      ```
  - All
    - Show all
    - Show only selected
- SVG viewport
  - Zoom
  - Movement
- [ ] Resize of annotation box
  - [ ] Size not larger than SVG viewport
- [ ] Move of annotation box
- Special behavior
  - Video annotation
    - Show prev. position (dotted)
    - Show next position (dotted)
    - Go to next/prev. position
- Annotation box
  - Show label at box under top left border corner
