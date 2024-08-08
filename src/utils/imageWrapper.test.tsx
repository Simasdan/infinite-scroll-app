import { handleFavourite } from "./handleFavourite";
import { FlickrPhoto } from "./handleFavourite";

describe('handleFavourite', () => {
    let favouriteImages: FlickrPhoto[];
    let mockPhoto: FlickrPhoto;
    let setFavourites: jest.Mock;
    let storageMock: { setItem: jest.Mock };

    beforeEach(() => {
        mockPhoto = {
            id: '1',
            owner: 'Ryan Reynolds',
            secret: 'secret1',
            server: 'server1',
            farm: 1,
            title: 'Deadpool',
            ispublic: 1,
            isfriend: 0,
            isfamily: 0,
        };

        favouriteImages = [
            {
                id: '2',
                owner: 'Hugh Jackman',
                secret: 'secret2',
                server: 'server2',
                farm: 2,
                title: 'Wolverine',
                ispublic: 1,
                isfriend: 0,
                isfamily: 0,
            },
        ];

        setFavourites = jest.fn();
        storageMock = {
          setItem: jest.fn(),
        };
    });

    it('should add a photo to the favourites if it is not already favoured', () => {
        handleFavourite(mockPhoto, favouriteImages, setFavourites, storageMock);
        expect(setFavourites).toHaveBeenCalledWith([...favouriteImages, mockPhoto]);
        expect(storageMock.setItem).toHaveBeenCalledWith('favourites', JSON.stringify([...favouriteImages, mockPhoto]));
    })
})