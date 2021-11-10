import { app } from './Firebase';

import 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';

const db = getFirestore(app);

export async function isUserAdmin(uid) {
    const response  = await db
        .collection('admins')
        .doc(uid)
        .get();
    
    return response.exists;
}