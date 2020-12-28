describe('test searchShows func', function(){
    
    //could return the first element in the array
    it('should return a jQuery object', async function(){
        let result = await searchShows('star');
        let expected = {id: 2746, 
            image: "http://static.tvmaze.com/uploads/images/original_untouched/88/222182.jpg",
            name: 'Star', 
            summary: "<p>Featuring a soundtrack of original music and stunning music performances, <b>Star</b> follows three talented singers, desperate for a new start and with ambitions of stardom, as they navigate the cut-throat music business on their road to success. Meet Star, a tough-as-nails young woman, who came up in the foster care system and decides one day to take control of her destiny. Star tracks down her sister, Simone, and her Instagram bestie, Alexandra, and together, the trio journeys to Atlanta to become music superstars. Reality soon dawns on the girls' fantasies, and they start to learn that ambition often comes at a cost. And sometimes that cost is too high.</p>" 
        }

        expect(result[0]).toEqual(expected);
    });

    it('should update DOM with shows', async function(){
        let showData = [{id: 2746, 
            image: "http://static.tvmaze.com/uploads/images/original_untouched/88/222182.jpg",
            name: 'Star', 
            summary: "Featuring a soundtrack of original music and stunning music performances, <b>Star</b> follows three talented singers, desperate for a new start and with ambitions of stardom, as they navigate the cut-throat music business on their road to success. Meet Star, a tough-as-nails young woman, who came up in the foster care system and decides one day to take control of her destiny. Star tracks down her sister, Simone, and her Instagram bestie, Alexandra, and together, the trio journeys to Atlanta to become music superstars. Reality soon dawns on the girls' fantasies, and they start to learn that ambition often comes at a cost. And sometimes that cost is too high." 
        }];
    
        //update DOM with data above
        populateShows(showData);

        // let $result = $('#shows-list').html();
        let $expectedImg = $('img');
        let $expectedSummary = $('p').get(0).innerHTML;
        let $expectedName = $('h5').get(0);

        
        //test to ensure image, name, and summary were updated in the DOM
        expect($expectedImg.get(0).src).toEqual(showData[0].image);
        expect($expectedName.innerText).toEqual(showData[0].name);
        expect(showData[0].summary).toEqual($expectedSummary);
    });
})


