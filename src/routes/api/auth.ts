import { Router, Request, Response} from 'express';

const router = Router();

router.post('/login', (req: Request, res: Response) => {
    res.json({
        status: 'success',
        message: 'auth successfully'
    })
});

router.post('/verify', (req: Request, res: Response) => {
    res.json({
        status: 'success',
        message: 'verify successfully'
    })
});

router.post('/logout', (req: Request, res: Response) => {
    res.json({
        status: 'success',
        message: 'logout successfully'
    })
});

export default router;