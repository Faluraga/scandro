import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';




async function savePassword(data: any)
{
    try
    {
        await SecureStore.setItemAsync('password', data);
    } catch (error)
    {
        console.log(error);
    }
}

async function saveNameUser(name: any, surname: any)
{

    try
    {
        await SecureStore.setItemAsync('dataUser', name);
    } catch (error)
    {
        console.log(error);
    }
}

async function saveToken(token: any)
{

    try
    {

        const tokenDropi = await SecureStore.setItemAsync('Dropitoken', token);

        //const tokenDropi = await AsyncStorage.setItem('Dropitoken',token); 


        return tokenDropi;
    } catch (error)
    {
        console.log(error);
    }
}

async function saveIdUser(id: any)
{

    try
    {

        const idUser = await SecureStore.setItemAsync('idUser', JSON.stringify(id))

        return idUser;
    } catch (error)
    {
        console.log(error);
    }
}

async function readPassword()
{

    try
    {
        const password = await SecureStore.getItemAsync('password');

        return password;
    } catch (error)
    {
        console.log(error);
    }
}

async function readNameUser()
{

    try
    {
        const user = await SecureStore.getItemAsync('dataUser');
        //console.log('User = ', user);

        return user
    } catch (error)
    {
        console.log(error);
    }
}

async function readToken()
{
    const dropiToken = await SecureStore.getItemAsync('Dropitoken')

    return dropiToken;
}

async function readIdUser()
{
    try
    {


        const idUser = SecureStore.getItemAsync("idUser").then(value =>
        {
            console.log("Value for key is", value);
        });

        return idUser;

    } catch (error)
    {
        console.log(error);
    }

}

async function deleteToken(token: any)
{
    try
    {
        const tokenDropi = await SecureStore.deleteItemAsync(token)

        return tokenDropi;
    } catch (error)
    {
        console.log(error);
    }

}


////Metodo alterno para leer token almacenado en storage
export const readtoken = () =>
{
    return new Promise((resolve, reject) =>
    {
        AsyncStorage.getItem('Dropitoken')
            .then(res =>
            {
                if (res !== null)
                {
                    resolve(res);


                } else
                {
                    resolve(false);
                }
            })
            .catch(err => reject(err));
    });
};



export
{
    saveNameUser,
    savePassword,
    readPassword,
    readNameUser,
    saveToken,
    readToken,
    deleteToken,
    saveIdUser,
    readIdUser
}