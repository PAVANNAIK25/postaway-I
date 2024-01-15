import multer from "multer";


const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, 'public/uploads');
    },
    filename:(req, file, cb)=>{
        const name = Date.now();
        cb(null, name+ '-' + file.originalname);
    }
});

export const upload = multer({storage:storage});
