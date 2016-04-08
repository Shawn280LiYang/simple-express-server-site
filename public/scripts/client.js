$(document).ready(function(){
	$(function(){
		$.ajax('/blocks',{
			success: appendToList
		});
	});
	
	function appendToList(blocks){
		var list=[];
		var block,content,newEle;
		
		for(var i=0;i<blocks.length;i++){
			/*
			newEle=$('<li>',{text:blocks[i],
							 mouseenter:function(){
							 	$(this).addClass('test');
							 },
							 mouseleave:function(){
								$(this).removeClass('test');
							 }
							});
			list.push(newEle);
			*/
			block = blocks[i];
			content='<a href=# data-block='+block+'> <img class="deleteicon" src="/images/deleteicon.png"/> </a>  <a class="aaa" href="/blocks/'+block+'"> '+block+'</a>';
			newEle =$('<li>',{html:content});
			list.push(newEle);
		}
		$('.blocks-list').append(list);
	}

	$('#change').on('click',function(){
		$('h1').text("jQuery is OK!")});

	$('#add').on('click',function(){
		$.ajax('add.html',
			{success:function(response){
				$('#toadd').html(response);	
				}
			}
		);
	})
	
	$('form').on('submit',function(event){
		event.preventDefault();
		var form = $(this);
		var blockData = form.serialize();
		$.ajax({
			type:'POST',
			url:'/blocks',
			data:blockData
		}).done(function(blockName){       //.done is same as success.
			appendToList([blockName]);
			form.trigger('reset');
		});		
	});

	$('.blocks-list').on('click','a[data-block]',function(event){
		event.preventDefault();
		if(!confirm('Are you sure to delete the block?')){
			return false;
		}
		var target = $(event.currentTarget);

		$.ajax({
			type:"DELETE",
			url:"/blocks/"+target.data('block')
		}).done(function(){
			target.parents('li').remove();
		});
	});

});
