const clientId = 'zKitfBE7RU3R7AMMAYsHzw';
const secret = 'tW4aLSLaUD9Yq1cYOqkkpp6ufAmCKYGuKDgXJO9l6izzjd0LMNVKVO64B3R5h9LT';
let accessToken;
// https://cors-anywhere.herokuapp.com/

const Yelp = {
	async getAccessToken(){
		try{
			let response = await fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/oauth2/token?grant_type=client_credentials&client_id=${clientId}&client_secret=${secret}`, {
				method: 'POST'
			});
			if (response.ok){
				let jsonResponse = await response.json();
				accessToken = jsonResponse.access_token;
			}
		}catch (e){
			console.log(e);
		}
	},
	search(term, location, sortBy){
		return Yelp.getAccessToken().then(() => {
			return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`, {
				headers: {
					Authorization: `Bearer ${accessToken}`
				}
			});
		}).then(response => {
			return response.json();
		}).then(jsonResponse => {
			console.log(jsonResponse.businesses);
			if (jsonResponse.businesses){
				return jsonResponse.businesses.map(business => ({
		          id: business.id,
		          url: business.url,
		          imageSrc: business.image_url,
		          name: business.name,
		          address: business.location.address1,
		          city: business.location.city,
		          state: business.location.state,
		          zipCode: business.location.zip_code,
		          category: business.categories[0].title,
		          rating: business.rating,
		          reviewCount: business.review_count,
		          latitude: business.coordinates.latitude,
		          longitude: business.coordinates.longitude
				}));
			}
		});
	}
}

export default Yelp;

		/*if (accessToken){
			return new Promise(resolve => resolve(accessToken));
		}
		return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/oauth2/token?grant_type=client_credentials&client_id=${clientId}&client_secret=${secret}`, {
			method: 'POST'
		}).then(response => {
			return response.json();
		}).then(jsonResponse => {
			accessToken = jsonResponse.access_token;
		});*/

		/*try{
			let response = await fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`, {
				headers: {
					Authorization: `Bearer ${accessToken}`
				}
			});
			if (response.ok){
				let jsonResponse = await response.json();
				if (jsonResponse.businesses){
					return jsonResponse.businesses.map(business => ({
			          id: business.id,
			          imageSrc: business.image_url,
			          name: business.name,
			          address: business.location.address1,
			          city: business.location.city,
			          state: business.location.state,
			          zipCode: business.location.zip_code,
			          category: business.categories[0].title,
			          rating: business.rating,
			          reviewCount: business.review_count
					}));
				}
			}
		}catch (e){
			console.log(e);
		}*/