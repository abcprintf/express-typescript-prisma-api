import { Router, Request, Response} from 'express';

const router = Router();

router.post('/auth/login', (req: Request, res: Response) => {
    res.json({
        status: 'success',
        message: 'auth successfully'
    })
});

router.post('/auth/verify', (req: Request, res: Response) => {
    res.json({
        status: 'success',
        message: 'verify successfully'
    })
});

router.post('/auth/logout', (req: Request, res: Response) => {
    res.json({
        status: 'success',
        message: 'logout successfully'
    })
});

export default router;